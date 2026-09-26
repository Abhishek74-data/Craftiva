import { chromium } from "playwright";

const url = process.argv[2] || "https://craftivafurniture.vercel.app/";
const tag = process.argv[3] || "run";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.addInitScript(() => {
  window.__m = { shifts: [], longTasks: [], frames: [], errors: [], recording: false };
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries())
        if (!e.hadRecentInput) window.__m.shifts.push({ v: e.value, t: Math.round(e.startTime) });
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries())
        if (e.duration > 50) window.__m.longTasks.push({ d: Math.round(e.duration), t: Math.round(e.startTime) });
    }).observe({ type: "longtask", buffered: true });
  } catch {}
  let last = performance.now();
  const tick = (t) => {
    const dt = t - last;
    last = t;
    if (window.__m.recording) window.__m.frames.push({ dt, y: window.scrollY });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  window.addEventListener("error", (e) => window.__m.errors.push(String(e.message).slice(0, 120)));
  window.addEventListener("unhandledrejection", (e) => window.__m.errors.push(String(e.reason).slice(0, 120)));
});

await page.goto(url, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(3000); // entrance animations settle

const results = { url, tag };

function stats(frames) {
  const f = frames.slice(2);
  if (f.length < 5) return null;
  const dts = f.map((x) => x.dt);
  const avg = dts.reduce((a, b) => a + b, 0) / dts.length;
  const max = Math.max(...dts);
  const p95 = dts.slice().sort((a, b) => a - b)[Math.floor(dts.length * 0.95)];
  const over33 = dts.filter((d) => d > 33.4).length;
  // movement smoothness: per-frame scroll deltas while moving
  const deltas = [];
  for (let i = 1; i < f.length; i++) deltas.push(Math.abs(f[i].y - f[i - 1].y));
  const moving = deltas.filter((d) => d > 0);
  let cv = null;
  let steppedPct = null;
  if (moving.length > 4) {
    const mean = moving.reduce((a, b) => a + b, 0) / moving.length;
    const sd = Math.sqrt(moving.reduce((a, b) => a + (b - mean) ** 2, 0) / moving.length);
    cv = +(sd / mean).toFixed(2);
    // burstiness: fraction of moving frames whose delta > 3x mean of moving deltas
    steppedPct = +((moving.filter((d) => d > mean * 3).length / moving.length) * 100).toFixed(1);
  }
  const totalDist = deltas.reduce((a, b) => a + b, 0);
  return {
    frames: f.length,
    avgMs: +avg.toFixed(1),
    p95Ms: +p95.toFixed(1),
    maxMs: +max.toFixed(1),
    over33ms: over33,
    movedPx: Math.round(totalDist),
    moveCV: cv,
    burstPct: steppedPct,
  };
}

async function scrollTest(name, { dy, steps, delay, from }) {
  await page.evaluate((y) => scrollTo(0, y ?? 0), from ?? 0);
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    window.__m.frames = [];
    window.__m.recording = true;
  });
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, dy);
    await page.waitForTimeout(delay);
  }
  await page.waitForTimeout(900); // settle / let smoothing finish
  const frames = await page.evaluate(() => {
    window.__m.recording = false;
    return window.__m.frames;
  });
  const s = stats(frames);
  // continuity: share of frames that actually moved while the gesture ran
  if (s) {
    const deltas = [];
    for (let i = 1; i < frames.length; i++) deltas.push(Math.abs(frames[i].y - frames[i - 1].y));
    const moving = deltas.filter((d) => d > 0.5).length;
    s.continuity = +((moving / Math.max(1, deltas.length)) * 100).toFixed(1);
  }
  results[name] = s;
}

await scrollTest("slowScroll", { dy: 120, steps: 40, delay: 50 });
await scrollTest("fastScroll", { dy: 600, steps: 25, delay: 16 });
await scrollTest("reverseScroll", { dy: -500, steps: 30, delay: 16, from: 5000 });
await scrollTest("normalScroll", { dy: 300, steps: 30, delay: 33 });

// header height stability across the scrolled threshold
await page.evaluate(() => scrollTo(0, 0));
await page.waitForTimeout(500);
const hBefore = await page.evaluate(() => {
  const h = document.querySelector("header");
  return h ? +h.getBoundingClientRect().height.toFixed(2) : null;
});
await page.evaluate(() => scrollTo(0, 300));
await page.waitForTimeout(800);
const hAfter = await page.evaluate(() => {
  const h = document.querySelector("header");
  return h ? +h.getBoundingClientRect().height.toFixed(2) : null;
});
results.headerHeight = { atTop: hBefore, at300: hAfter, stable: hBefore === hAfter };

// hero image parallax transform actually changes on scroll
await page.evaluate(() => scrollTo(0, 0));
await page.waitForTimeout(600);
const t0 = await page.evaluate(() => {
  const img = document.querySelector("section img");
  const el = img ? img.closest("[style]") : null;
  return el ? el.style.transform || getComputedStyle(el).transform : null;
});
await page.evaluate(() => scrollTo(0, 600));
await page.waitForTimeout(500);
const t1 = await page.evaluate(() => {
  const img = document.querySelector("section img");
  const el = img ? img.closest("[style]") : null;
  return el ? el.style.transform || getComputedStyle(el).transform : null;
});
results.heroTransform = { top: t0, scrolled: t1, parallaxWorks: t0 !== t1 };

// sticky elements actually stick
const stickyInfo = await page.evaluate(() => {
  const els = [...document.querySelectorAll("*")].filter(
    (e) => getComputedStyle(e).position === "sticky"
  );
  const first = els[0];
  return { count: els.length, firstTag: first ? first.tagName : null };
});
results.sticky = stickyInfo;

// totals
results.cls = +(await page.evaluate(() =>
  window.__m.shifts.reduce((a, s) => a + s.v, 0)
)).toFixed(4);
results.layoutShifts = await page.evaluate(() => window.__m.shifts.slice(0, 8));
results.longTasksOver50ms = await page.evaluate(() => window.__m.longTasks);
results.jsErrors = await page.evaluate(() => window.__m.errors);

// horizontal overflow at required widths (fresh load per width for honesty)
results.overflow = {};
for (const w of [360, 390, 430, 768, 1024, 1440]) {
  const p2 = await browser.newPage({ viewport: { width: w, height: 800 } });
  await p2.goto(url, { waitUntil: "load", timeout: 60000 });
  await p2.waitForTimeout(1200);
  results.overflow[w] = await p2.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
    overflow: document.documentElement.scrollWidth > window.innerWidth,
  }));
  await p2.close();
}

// performance resource summary (heavy images/js)
results.resources = await page.evaluate(() => {
  const rs = performance.getEntriesByType("resource");
  const byType = {};
  for (const r of rs) {
    const t = r.initiatorType;
    byType[t] = byType[t] || { count: 0, bytes: 0 };
    byType[t].count++;
    byType[t].bytes += r.transferSize || 0;
  }
  const total = rs.reduce((a, r) => a + (r.transferSize || 0), 0);
  const slowest = rs
    .filter((r) => r.duration > 300)
    .map((r) => ({ n: r.name.split("/").slice(-1)[0].slice(0, 40), d: Math.round(r.duration) }))
    .slice(0, 6);
  return { totalKB: Math.round(total / 1024), byType, slowest };
});

console.log(JSON.stringify(results, null, 1));
await browser.close();
