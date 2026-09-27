import { chromium } from "playwright";
import fs from "fs";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);

const events = [];
let stream = null;
cdp.on("Tracing.dataCollected", (p) => events.push(...p.value));
const complete = new Promise((res) => cdp.on("Tracing.tracingComplete", (p) => { stream = p.stream; res(p); }));

await cdp.send("Tracing.start", {
  transferModes: ["ReturnAsStream"],
  categories: "disabled-by-default-devtools.timeline,devtools.timeline,blink.user_timing,loading,disabled-by-default-devtools.timeline.frame",
});

await page.goto("https://craftivafurniture.vercel.app/", { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(3000);

await page.evaluate(() => performance.mark("S1"));
// slow scroll for ~10s
for (let i = 0; i < 170; i++) { await page.mouse.wheel(0, 55); await page.waitForTimeout(55); }
// fast scroll up
for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, -900); await page.waitForTimeout(25); }
await page.waitForTimeout(1500);
await page.evaluate(() => performance.mark("S2"));

await cdp.send("Tracing.end");
await complete;
// data arrives via dataCollected (Playwright buffers it even with ReturnAsStream)
const text = JSON.stringify(events);
fs.writeFileSync("trace.json", text);
await browser.close();

const trace = JSON.parse(text);
const evs = trace.filter((e) => e.dur && e.dur > 0);
const marks = trace.filter((e) => e.name === "blink.user_timing" && (e.args?.data?.name === "S1" || e.args?.data?.name === "S2"));
const s1 = marks.find((m) => m.args.data.name === "S1")?.ts ?? 0;
const s2 = marks.find((m) => m.args.data.name === "S2")?.ts ?? Infinity;
const byPhase = (e) => (e.ts >= s1 && e.ts <= s2 ? "scroll" : "load");

// summarize main-thread events during scroll window
const names = {};
for (const e of evs) {
  if (byPhase(e) !== "scroll") continue;
  const n = e.name;
  names[n] = names[n] || { count: 0, totalMs: 0, maxMs: 0 };
  names[n].count++;
  names[n].totalMs += e.dur / 1000;
  names[n].maxMs = Math.max(names[n].maxMs, e.dur / 1000);
}
const top = Object.entries(names).filter(([, v]) => v.totalMs > 5).sort((a, b) => b[1].totalMs - a[1].totalMs);
console.log("=== SCROLL WINDOW (main-thread event totals, ms) ===");
for (const [k, v] of top.slice(0, 25)) console.log(k.padEnd(28), "count:", String(v.count).padStart(5), "total:", v.totalMs.toFixed(1), "max:", v.maxMs.toFixed(1));

// Layout events with stack traces (forced layout attribution)
const forced = evs.filter((e) => (e.name === "Layout" || e.name === "UpdateLayoutTree") && byPhase(e) === "scroll" && e.args?.beginData?.stackTrace);
console.log("\n=== forced layout/style reads during scroll:", forced.length, "===");
for (const f of forced.slice(0, 5)) {
  console.log(" ", f.name, (f.dur/1000).toFixed(1) + "ms", JSON.stringify(f.args.beginData.stackTrace[0]).slice(0, 220));
}

// biggest tasks during scroll
const tasks = evs.filter((e) => e.name === "RunTask" && byPhase(e) === "scroll").sort((a, b) => b.dur - a.dur).slice(0, 6);
console.log("\n=== biggest RunTasks during scroll ===");
for (const t of tasks) {
  const child = evs.filter((e) => e.ts >= t.ts && e.ts + e.dur <= t.ts + t.dur && e !== t && e.dur > 1000)
    .sort((a, b) => b.dur - a.dur).slice(0, 6)
    .map((c) => `${c.name}:${(c.dur/1000).toFixed(1)}ms`);
  console.log(` ${(t.dur/1000).toFixed(0)}ms @${(t.ts/1000 - T0*0 + 0).toFixed(0)} children:`, child.join(", "));
}
