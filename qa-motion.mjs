import { chromium } from "playwright";
const B = "https://craftivafurniture.vercel.app";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const R = { errors: [], checks: {} };

function attach(page, tag) {
  page.on("pageerror", (e) => R.errors.push(`${tag}: ${String(e).slice(0, 120)}`));
  page.on("console", (m) => {
    if (m.type() === "error") R.errors.push(`${tag}c: ${m.text().slice(0, 120)}`);
  });
}

/* ── DESKTOP 1440x900 ── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  attach(page, "desktop");
  const imgReq = new Map();
  page.on("response", (r) => {
    if (r.request().resourceType() === "image")
      imgReq.set(r.url(), (imgReq.get(r.url()) || 0) + 1);
  });
  await page.goto(B + "/", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2200);

  const heroT = () =>
    page.evaluate(() => {
      const img = document.querySelector("section.sticky img");
      return img ? img.parentElement.style.transform : null;
    });
  R.checks.heroAt0 = await heroT();
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(1200);
  R.checks.heroAt900 = await heroT();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);

  R.checks.workshopImgAnim = await page.evaluate(() => {
    const s = [...document.querySelectorAll("section")].find((e) =>
      e.textContent.includes("See how your furniture comes together")
    );
    const img = s?.querySelector("img");
    return img ? getComputedStyle(img).animationName : "no-section";
  });

  const wRect = () =>
    page.evaluate(() => {
      const s = [...document.querySelectorAll("section")].find((e) =>
        e.textContent.includes("See how your furniture comes together")
      );
      const wrap = s?.querySelector(":scope > div.wrap");
      const r = s?.getBoundingClientRect();
      const wr = wrap?.getBoundingClientRect();
      return { sectionH: r ? r.height : -1, wrapTop: wr ? Math.round(wr.top) : -999 };
    });
  const wTop = await page.evaluate(() => {
    const s = [...document.querySelectorAll("section")].find((e) =>
      e.textContent.includes("See how your furniture comes together")
    );
    return s ? s.getBoundingClientRect().top + window.scrollY : 0;
  });
  await page.evaluate((y) => window.scrollTo(0, y), wTop + 100);
  await page.waitForTimeout(1200);
  const w1 = await wRect();
  await page.evaluate((y) => window.scrollTo(0, y), wTop + 500);
  await page.waitForTimeout(1200);
  const w2 = await wRect();
  R.checks.workshop = {
    sectionH: Math.round(w1.sectionH),
    vhRatio: +(w1.sectionH / 900).toFixed(2),
    wrapTopAt100: w1.wrapTop,
    wrapTopAt500: w2.wrapTop,
  };

  const iTop = await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")].find(
      (e) => e.className.includes("lg:sticky") && e.className.includes("lg:order-2")
    );
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  });
  await page.evaluate((y) => window.scrollTo(0, y), iTop - 400);
  await page.waitForTimeout(1000);
  const i1 = await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")].find(
      (e) => e.className.includes("lg:sticky") && e.className.includes("lg:order-2")
    );
    return Math.round(el.getBoundingClientRect().top);
  });
  await page.evaluate((y) => window.scrollTo(0, y), iTop - 150);
  await page.waitForTimeout(1000);
  const i2 = await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")].find(
      (e) => e.className.includes("lg:sticky") && e.className.includes("lg:order-2")
    );
    return Math.round(el.getBoundingClientRect().top);
  });
  R.checks.introSticky = {
    topAtMinus400: i1,
    topAtMinus150: i2,
    pinned: i1 === i2 && i2 > 0,
  };

  const mTop = await page.evaluate(() => {
    const img = document.querySelector('img[alt^="Solid wood dining"]');
    const frame = img ? img.closest("div.overflow-hidden") : null;
    return frame ? frame.getBoundingClientRect().top + window.scrollY : 0;
  });
  const mScale = () =>
    page.evaluate(() => {
      const img = document.querySelector('img[alt^="Solid wood dining"]');
      const motion = img ? img.closest("div.overflow-hidden").firstElementChild : null;
      return motion ? motion.style.transform : null;
    });
  await page.evaluate((y) => window.scrollTo(0, y), mTop - 850);
  await page.waitForTimeout(1000);
  R.checks.scaleEnter = await mScale();
  await page.evaluate((y) => window.scrollTo(0, y), mTop - 300);
  await page.waitForTimeout(1000);
  R.checks.scaleCenter = await mScale();

  const frames = await page.evaluate(
    () =>
      new Promise((res) => {
        const d = [];
        let last = performance.now();
        let n = 0;
        requestAnimationFrame(function loop(t) {
          d.push(t - last);
          last = t;
          if (++n < 180) requestAnimationFrame(loop);
          else res(d);
        });
        window.dispatchEvent(new WheelEvent("wheel", { deltaY: 600, bubbles: true }));
      })
  );
  const busy = frames.slice(5, -5);
  R.checks.frames = {
    avg: +(busy.reduce((a, b) => a + b, 0) / busy.length).toFixed(1),
    max: +Math.max(...busy).toFixed(1),
  };

  const dups = [...imgReq.values()].filter((v) => v > 1).length;
  R.checks.desktopDupImages = dups;
  R.checks.desktopOx = await page.evaluate(() => document.documentElement.scrollWidth - 1440);

  for (const r of ["/collections", "/product/regina-bed-beds", "/quote"]) {
    const res = await page.goto(B + r, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(600);
    if (res.status() !== 200) R.errors.push(`desktop ${r}: ${res.status()}`);
  }
  await ctx.close();
}

/* ── TABLET 1024x768 ── */
{
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();
  attach(page, "tablet");
  await page.goto(B + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1500);
  R.checks.tabletOx = await page.evaluate(() => document.documentElement.scrollWidth - 1024);
  R.checks.tabletParallaxOn = await page.evaluate(() => {
    const img = document.querySelector('img[alt^="Solid wood dining"]');
    const motion = img ? img.closest("div.overflow-hidden").firstElementChild : null;
    const t = (motion && motion.style.transform) || "";
    return t.includes("scale") || t.includes("translate");
  });
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(900);
  R.checks.tabletStickyWorkshop = await page.evaluate(() => {
    const s = [...document.querySelectorAll("section")].find((e) =>
      e.textContent.includes("See how your furniture comes together")
    );
    const wrap = s ? s.querySelector(":scope > div.wrap") : null;
    return wrap ? Math.round(wrap.getBoundingClientRect().top) : null;
  });
  await ctx.close();
}

/* ── MOBILE 390x844 (touch) ── */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  attach(page, "mobile");
  await page.goto(B + "/", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1500);
  R.checks.mobileOx = await page.evaluate(() => document.documentElement.scrollWidth - 390);
  const scrolled = await page.evaluate(
    () =>
      new Promise((res) => {
        const y0 = window.scrollY;
        const start = performance.now();
        const id = setInterval(() => {
          window.scrollBy(0, 60);
          if (performance.now() - start > 1200) {
            clearInterval(id);
            res(window.scrollY - y0);
          }
        }, 80);
      })
  );
  R.checks.mobileScrollAdvances = scrolled > 100;
  R.checks.mobileParallaxOff = await page.evaluate(() => {
    const img = document.querySelector('img[alt^="Solid wood dining"]');
    const motion = img ? img.closest("div.overflow-hidden").firstElementChild : null;
    return !motion || !motion.style.transform || motion.style.transform === "none";
  });
  R.checks.mobileWorkshopMinH = await page.evaluate(() => {
    const s = [...document.querySelectorAll("section")].find((e) =>
      e.textContent.includes("See how your furniture comes together")
    );
    return s ? getComputedStyle(s).minHeight : null;
  });
  await ctx.close();
}

/* ── REDUCED MOTION ── */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  attach(page, "reduced");
  await page.goto(B + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1200);
  const t0 = await page.evaluate(
    () => document.querySelector("section.sticky img").parentElement.style.transform
  );
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  const t1 = await page.evaluate(
    () => document.querySelector("section.sticky img").parentElement.style.transform
  );
  R.checks.reducedHeroStatic = t0 === t1;
  await ctx.close();
}

console.log(JSON.stringify(R, null, 1));
await browser.close();
