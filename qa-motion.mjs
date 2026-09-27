import { chromium } from "playwright";
const B = "https://craftivafurniture.vercel.app";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const R = { errors: [], checks: {} };
const jump = (page, y) => page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), y);
const nbsp = (s) => s.replace(/\u00A0/g, " ");

function attach(page, tag) {
  page.on("pageerror", (e) => R.errors.push(`${tag}: ${String(e).slice(0, 140)}`));
  page.on("console", (m) => {
    if (m.type() === "error") R.errors.push(`${tag}c: ${m.text().slice(0, 140)}`);
  });
}

/* ── DESKTOP ── */
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

  // hero entrance CSS + scroll settle
  R.checks.heroEnter = await page.evaluate(() => {
    const el = document.querySelector(".hero-enter");
    return el ? getComputedStyle(el).animationName : "missing";
  });
  const heroT = () =>
    page.evaluate(() => document.querySelector("section.sticky img").parentElement.style.transform);
  R.checks.heroAt0 = await heroT();
  await jump(page, 900); await page.waitForTimeout(600);
  R.checks.heroAt900 = await heroT();

  // workshop sticky pin (instant scroll)
  const wTop = await page.evaluate(() => { const findWorkshop = () => [...document.querySelectorAll("section")].find((e) => e.textContent.replace(/ /g, " ").includes("See how your furniture comes together")); return findWorkshop().getBoundingClientRect().top + window.scrollY; });
  const wWrap = () =>
    page.evaluate(() => { const findWorkshop = () => [...document.querySelectorAll("section")].find((e) => e.textContent.replace(/ /g, " ").includes("See how your furniture comes together")); return Math.round(findWorkshop().querySelector(":scope > div.wrap").getBoundingClientRect().top); });
  await jump(page, wTop + 200); await page.waitForTimeout(400);
  const wPin = await wWrap();
  await jump(page, wTop + 900); await page.waitForTimeout(400);
  const wEnd = await wWrap();
  R.checks.workshop = {
    sectionH: await page.evaluate(() => { const findWorkshop = () => [...document.querySelectorAll("section")].find((e) => e.textContent.replace(/ /g, " ").includes("See how your furniture comes together")); return Math.round(findWorkshop().getBoundingClientRect().height); }),
    wrapAt200: wPin,
    wrapAt900: wEnd,
    pinned: wPin === 0,
    bgAnim: await page.evaluate(() => { const findWorkshop = () => [...document.querySelectorAll("section")].find((e) => e.textContent.replace(/ /g, " ").includes("See how your furniture comes together")); return getComputedStyle(findWorkshop().querySelector("img")).animationName; }),
  };

  // intro sticky pin
  const iTop = await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")].find(
      (e) => e.className.includes("lg:sticky") && e.className.includes("lg:order-2")
    );
    return el.getBoundingClientRect().top + window.scrollY;
  });
  const iPos = () =>
    page.evaluate(() => {
      const el = [...document.querySelectorAll("div")].find(
        (e) => e.className.includes("lg:sticky") && e.className.includes("lg:order-2")
      );
      return Math.round(el.getBoundingClientRect().top);
    });
  await jump(page, iTop - 50); await page.waitForTimeout(400);
  const iBefore = await iPos();
  await jump(page, iTop - 350); await page.waitForTimeout(400);
  const iPin1 = await iPos();
  await jump(page, iTop - 600); await page.waitForTimeout(400);
  const iPin2 = await iPos();
  R.checks.introSticky = { beforePin: iBefore, pinAt350: iPin1, pinAt600: iPin2, pinned: iPin1 === 112 && iPin2 === 112 };

  // material story sticky (pre-existing) + scroll-scale settle
  const mTop = await page.evaluate(() => {
    const img = document.querySelector('img[alt^="Solid wood dining"]');
    return img.closest("div.overflow-hidden").getBoundingClientRect().top + window.scrollY;
  });
  await jump(page, mTop - 850); await page.waitForTimeout(400);
  const sEnter = await page.evaluate(() => {
    const img = document.querySelector('img[alt^="Solid wood dining"]');
    return img.closest("div.overflow-hidden").firstElementChild.style.transform;
  });
  await jump(page, mTop - 250); await page.waitForTimeout(400);
  const sCenter = await page.evaluate(() => {
    const img = document.querySelector('img[alt^="Solid wood dining"]');
    return img.closest("div.overflow-hidden").firstElementChild.style.transform;
  });
  R.checks.materialScale = { enter: sEnter, nearCenter: sCenter };

  // frames during wheel
  const frames = await page.evaluate(
    () =>
      new Promise((res) => {
        const d = [];
        let last = performance.now();
        let n = 0;
        requestAnimationFrame(function loop(t) {
          d.push(t - last);
          last = t;
          if (++n < 150) requestAnimationFrame(loop);
          else res(d);
        });
        window.dispatchEvent(new WheelEvent("wheel", { deltaY: 500, bubbles: true }));
      })
  );
  const busy = frames.slice(5, -5);
  R.checks.frames = {
    avg: +(busy.reduce((a, b) => a + b, 0) / busy.length).toFixed(1),
    max: +Math.max(...busy).toFixed(1),
  };
  R.checks.dupImages = [...imgReq.values()].filter((v) => v > 1).length;
  R.checks.ox = await page.evaluate(() => document.documentElement.scrollWidth - 1440);

  for (const r of ["/collections", "/categories/sofas", "/product/regina-bed-beds", "/quote", "/search?q=sofa"]) {
    const res = await page.goto(B + r, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(500);
    if (res.status() !== 200) R.errors.push(`desktop ${r}: ${res.status()}`);
    const ox = await page.evaluate(() => document.documentElement.scrollWidth - 1440);
    if (ox > 1) R.errors.push(`desktop ${r}: ox=${ox}`);
  }
  await ctx.close();
}

/* ── TABLET ── */
{
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();
  attach(page, "tablet");
  await page.goto(B + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1500);
  const wTop = await page.evaluate(() => { const findWorkshop = () => [...document.querySelectorAll("section")].find((e) => e.textContent.replace(/ /g, " ").includes("See how your furniture comes together")); return findWorkshop().getBoundingClientRect().top + window.scrollY; });
  await jump(page, wTop + 300); await page.waitForTimeout(400);
  R.checks.tablet = {
    ox: await page.evaluate(() => document.documentElement.scrollWidth - 1024),
    wrapPinned: await page.evaluate(() => { const findWorkshop = () => [...document.querySelectorAll("section")].find((e) => e.textContent.replace(/ /g, " ").includes("See how your furniture comes together")); return Math.round(findWorkshop().querySelector(":scope > div.wrap").getBoundingClientRect().top); }),
    parallaxOn: await page.evaluate(() => {
      const img = document.querySelector('img[alt^="Solid wood dining"]');
      const t = img.closest("div.overflow-hidden").firstElementChild.style.transform || "";
      return t.includes("scale") || t.includes("translate");
    }),
  };
  await ctx.close();
}

/* ── MOBILE (touch) ── */
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
  const scrolled = await page.evaluate(
    () =>
      new Promise((res) => {
        const y0 = window.scrollY;
        const start = performance.now();
        const id = setInterval(() => {
          window.scrollBy(0, 60);
          if (performance.now() - start > 1000) {
            clearInterval(id);
            res(window.scrollY - y0);
          }
        }, 80);
      })
  );
  R.checks.mobile = {
    ox: await page.evaluate(() => document.documentElement.scrollWidth - 390),
    scrollAdvances: scrolled > 80,
    parallaxOff: await page.evaluate(() => {
      const img = document.querySelector('img[alt^="Solid wood dining"]');
      const m = img ? img.closest("div.overflow-hidden").firstElementChild : null;
      return !m || !m.style.transform || m.style.transform === "none";
    }),
    workshop: await page.evaluate(() => {
      const findWorkshop = () => [...document.querySelectorAll("section")].find((e) => e.textContent.replace(/ /g, " ").includes("See how your furniture comes together"));
      const s = findWorkshop();
      return {
        minH: getComputedStyle(s).minHeight,
        wrapPos: getComputedStyle(s.querySelector(":scope > div.wrap")).position,
      };
    }),
    heroEnter: await page.evaluate(() => Boolean(document.querySelector(".hero-enter"))),
  };
  await ctx.close();
}

/* ── REDUCED MOTION ×3 ── */
{
  const results = [];
  for (let i = 0; i < 3; i++) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 90)));
    page.on("console", (m) => {
      if (m.type() === "error") errs.push("c:" + m.text().slice(0, 90));
    });
    await page.goto(B + "/", { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(1500);
    const vis = await page.evaluate(() => {
      // hero entrance collapsed + a FadeUp block visible + scrub heading present
      const he = document.querySelector(".hero-enter");
      const heDone = he ? getComputedStyle(he).opacity === "1" : false;
      const h = [...document.querySelectorAll("h2")].find((e) =>
        e.textContent.replace(/\u00A0/g, " ").includes("Shop by category")
      );
      const headingVisible = h ? parseFloat(getComputedStyle(h).opacity) > 0.9 : null;
      // scroll to a FadeUp block and confirm it is visible
      return { heDone, headingVisible };
    });
    // scroll a FadeUp into view — must be fully visible with reduce
    await page.evaluate(() => {
      const el = [...document.querySelectorAll("div")].find(
        (e) => e.className === "order-2 lg:order-1"
      );
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 300, behavior: "instant" });
    });
    await page.waitForTimeout(500);
    const fadeUpVisible = await page.evaluate(() => {
      const el = [...document.querySelectorAll("div")].find(
        (e) => e.className === "order-2 lg:order-1"
      );
      if (!el) return null;
      return parseFloat(getComputedStyle(el).opacity) > 0.9;
    });
    // hero image transform must not drift with scroll under reduce
    const t0 = await page.evaluate(() => document.querySelector("section.sticky img").parentElement.style.transform);
    await jump(page, 800); await page.waitForTimeout(400);
    const t1 = await page.evaluate(() => document.querySelector("section.sticky img").parentElement.style.transform);
    results.push({ errs: errs.length ? errs : "clean", ...vis, fadeUpVisible, heroStatic: t0 === t1 });
    await ctx.close();
  }
  R.checks.reducedMotion = results;
}

console.log(JSON.stringify(R, null, 1));
await browser.close();
