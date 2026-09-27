import { chromium } from "playwright";
import fs from "fs";

const URL = "https://craftivafurniture.vercel.app/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Performance.enable");

// trace capture during scroll phases
await cdp.send("Tracing.start", {
  transferModes: ["ReturnAsStream"],
  categories: "disabled-by-default-devtools.timeline,devtools.timeline,blink.user_timing,loading",
});

const metrics = async () => {
  const { metrics } = await cdp.send("Performance.getMetrics");
  return Object.fromEntries(metrics.map((m) => [m.name, m.value]));
};

// in-page instrumentation
await page.addInitScript(() => {
  window.__prof = { frames: [], longTasks: [], layoutShifts: [] };
  let last = performance.now();
  const tick = (t) => {
    const dt = t - last;
    last = t;
    window.__prof.frames.push({ t, dt, y: window.scrollY });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) window.__prof.longTasks.push({ start: e.startTime, dur: e.duration, name: e.name });
  }).observe({ entryTypes: ["longtask"] });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__prof.layoutShifts.push({ start: e.startTime, v: e.value });
  }).observe({ entryTypes: ["layout-shift"] });
  window.__mark = (label) => window.__prof.frames.push({ t: performance.now(), dt: -1, y: window.scrollY, label });
});

await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2500); // entrance animations settle
await page.evaluate(() => window.__mark("phase-start"));

const phases = {};
const scrollPhase = async (name, { steps, delta, delay }) => {
  const m0 = await metrics();
  await page.evaluate((n) => window.__mark(n), name);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, delta);
    await page.waitForTimeout(delay);
  }
  await page.waitForTimeout(600);
  const m1 = await metrics();
  await page.evaluate((n) => window.__mark("end-" + n), name);
  phases[name] = {
    scrollY: await page.evaluate(() => window.scrollY),
    delta: Object.fromEntries(["LayoutCount","RecalcStyleCount","LayoutDuration","RecalcStyleDuration","ScriptDuration","TaskDuration","JSHeapUsedSize"]
      .map((k) => [k, +( (m1[k] ?? 0) - (m0[k] ?? 0) ).toFixed(3)])),
  };
};

// A. slow wheel down (full page over ~20s)
const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
await scrollPhase("A-slow-down", { steps: Math.ceil(maxScroll / 40), delta: 40, delay: 55 });
// B. fast down (if not at bottom, continue fast)
await scrollPhase("B-fast-down", { steps: 40, delta: 600, delay: 30 });
// C. reverse up fast
await scrollPhase("C-fast-up", { steps: 60, delta: -700, delay: 25 });
// D. reverse up slow
await scrollPhase("D-slow-up", { steps: 60, delta: -120, delay: 45 });

const prof = await page.evaluate(() => window.__prof);

// frame stats per phase (between labels)
const labels = prof.frames.filter((f) => f.label);
const frameStats = {};
const segments = [];
for (let i = 0; i < labels.length - 1; i++) segments.push([labels[i], labels[i + 1], labels[i].label]);
for (const [s, e, name] of segments) {
  const frames = prof.frames.filter((f) => f.t > s.t && f.t < e.t && f.dt >= 0);
  const gaps = frames.map((f) => f.dt).sort((a, b) => b - a);
  const n = gaps.length || 1;
  frameStats[name] = {
    frames: gaps.length,
    avg: +(gaps.reduce((a, b) => a + b, 0) / n).toFixed(2),
    p95: +(gaps[Math.floor(gaps.length * 0.05)] || 0).toFixed(2),
    over32: gaps.filter((g) => g > 32).length,
    over50: gaps.filter((g) => g > 50).length,
    max: +(gaps[0] || 0).toFixed(2),
  };
}

const out = {
  phases,
  frameStats,
  longTasks: prof.longTasks.map((t) => ({ at: +t.start.toFixed(0), dur: +t.dur.toFixed(0) })),
  layoutShifts: prof.layoutShifts.length,
  totalFrames: prof.frames.filter((f) => f.dt >= 0).length,
};
fs.writeFileSync("prof-result.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));

// save trace stream
const { stream } = await new Promise((res) => setTimeout(() => res({ stream: null }), 100));
try {
  const { stream: s } = await cdp.send("Tracing.end", {});
} catch {}
await browser.close();
