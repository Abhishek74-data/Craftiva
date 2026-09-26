const BASE = "https://craftivafurniture.vercel.app";
const get = async (p) => { const r = await fetch(BASE + p, { redirect: "manual" }); return { status: r.status, body: await r.text() }; };

const out = { routes: {}, leaks: {}, seo: {} };

// 1. Route sweep
const routes = ["/","/collections","/categories/sofas","/categories/beds","/categories/wardrobes","/categories/dining","/categories/tables","/categories/chairs","/categories/storage","/categories/office","/categories/ottomans","/categories/kids","/about","/contact","/process","/faqs","/quote","/search","/wishlist","/terms","/privacy","/shipping","/returns","/warranty"];
for (const r of routes) { const { status } = await get(r); out.routes[r] = status; }

// 2. Leakage checks on representative PDPs (previously contaminated)
for (const slug of ["regina-bed-beds","gemini-wardrobe-wardrobes","marcel-ottoman-ottomans","kent-chair-chairs","luella-bedside-table-tables","manuel-sofa-sofas","auburn-sofa-sofas","berkely-bed-beds"]) {
  const { body } = await get(`/product/${slug}`);
  const found = [];
  for (const pat of ["West Elm","weight:","cbm:","1PC/CTN","White Glove","lbs.","EASY RETURNS","COLOUR / FABRIC","Number of boxes","<p>","$19.99"]) if (body.includes(pat)) found.push(pat);
  out.leaks[slug] = { leak: found, size: /Built size/.test(body), sizeVal: (body.match(/Built size<\/dt>\s*<dd[^>]*>([^<]+)/)||[])[1] || null };
}

// 3. SEO checks
const home = await get("/");
out.seo.homeCanonical = /rel="canonical" href="https:\/\/craftivafurniture\.vercel\.app\/"/.test(home.body);
out.seo.heroPreload = /rel="preload"[^>]+hero-living-room\.jpg/.test(home.body) || /hero-living-room\.jpg[^>]+rel="preload"/.test(home.body);
const prod = await get("/product/regina-bed-beds");
out.seo.prodCanonical = /rel="canonical" href="https:\/\/craftivafurniture\.vercel\.app\/product\/regina-bed-beds"/.test(prod.body);
out.seo.breadcrumb = prod.body.includes("BreadcrumbList");
out.seo.prodJsonLd = prod.body.includes('"@type":"Product"');
const cat = await get("/categories/wardrobes");
out.seo.catCanonical = /rel="canonical" href="https:\/\/craftivafurniture\.vercel\.app\/categories\/wardrobes"/.test(cat.body);
out.seo.catBreadcrumb = cat.body.includes("BreadcrumbList");
const faqs = await get("/faqs");
out.seo.faqJsonLd = faqs.body.includes("FAQPage");
out.seo.faqCanonical = /rel="canonical" href="https:\/\/craftivafurniture\.vercel\.app\/faqs"/.test(faqs.body);
out.seo.faq50 = faqs.body.includes("up to 50%");
const sm = await get("/sitemap.xml");
out.seo.sitemapPolicies = ["terms","privacy","shipping","returns","warranty"].every(p => sm.body.includes(`/sitemap.xml`) || sm.body.includes(`/${p}`)) ? ["terms","privacy","shipping","returns","warranty"].filter(p=>sm.body.includes(`/${p}`)) : [];
out.seo.sitemapCount = (sm.body.match(/<url>/g)||[]).length;

console.log(JSON.stringify(out, null, 1));
