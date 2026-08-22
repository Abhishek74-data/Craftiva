/**
 * Craftiva catalogue ingestion engine.
 *
 * Scans the product image library, parses each product folder's description.txt,
 * groups folders into product families + colour/finish/size/config variants and
 * writes a structured manifest to /data/catalog.
 *
 *   npm run catalog
 *
 * Inputs:  IMAGES_ROOT (default ./Images)  — ORIGINALS ARE NEVER MODIFIED
 * Outputs: data/catalog/products.json, categories.json, review.json, meta.json
 */
import {
  readdirSync,
  readFileSync,
  existsSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { join, resolve, basename, relative, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

function loadEnvLocal() {
  const p = join(PROJECT_ROOT, ".env.local");
  if (!existsSync(p)) return {};
  const env = {};
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  return env;
}

const envLocal = loadEnvLocal();
const IMAGES_ROOT = resolve(
  PROJECT_ROOT,
  process.env.IMAGES_ROOT || envLocal.IMAGES_ROOT || "Images",
);
const OUT_DIR = join(PROJECT_ROOT, "data", "catalog");

/* ------------------------------------------------------------------ */
/* 1. description.txt parsing                                          */
/* ------------------------------------------------------------------ */

const SECTION_RE = /^[=\-]{5,}$/m;

function parseDescriptionText(raw) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const meta = {};
  for (const l of lines) {
    const m = l.match(/^([A-Za-z][\w &+]+):\s+(.+)$/);
    if (m && /^(URL|Category|Breadcrumb|Product ID|Colour|Price|SKUs|Images|Colour options)$/.test(m[1])) {
      meta[m[1]] = m[2].trim();
    }
  }

  const prose = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) continue;
    if (SECTION_RE.test(t)) continue;
    if (/^https?:\/\//i.test(t)) continue;
    if (/^(URL|Category|Breadcrumb|Product ID|Colour|Price|SKUs|Images|Colour options):/.test(t)) continue;
    if (/^[A-Z][A-Z0-9 &'+\-]+$/i.test(t) && t.length > 4 && t.length < 80 && SECTION_RE.test((lines[i + 1] ?? "").trim())) continue;
    prose.push(t);
  }
  const description = prose.join(" ").replace(/\s{2,}/g, " ").trim();

  const dims = {};
  for (const l of lines) {
    const m = l.match(/^([A-Za-z][\w /&()]+):\s+(.+)$/);
    if (m && /(overall|height|width|depth|weight|seat|mattress|product weight|clearance|side rails|capacity|leg|back)/i.test(m[1])) {
      const key = m[1].replace(/\s+/g, "_").toLowerCase().replace(/[^a-z0-9_]/g, "");
      if (key && !dims[key]) dims[key] = m[2].trim();
    }
  }

  return { name: lines[0]?.trim() || "", meta, description, dims };
}

/* ------------------------------------------------------------------ */
/* 2. Dictionaries                                                     */
/* ------------------------------------------------------------------ */

const COLOUR_PHRASES = [
  "Isabelline White", "Chantilly White", "Statuario White", "Snow Glossy", "Pandora Brown",
  "Calacatta Viola", "Calcatta Viola", "Calacatta Oro", "Champagne Gold", "Antique Silver",
  "Almond Cream", "Mushroom Beige", "Champagne Beige", "Antique Brass", "Polished Stainless",
  "Taj Mahal", "Medium Brown", "Caramel Oak", "Smoky Walnut", "Mocha Walnut", "Deep Brown",
  "Desert Brown", "Vintage Tan", "Camel Tan", "Dusty Beige", "Pearl Beige", "Oyster Grey",
  "Glacier Grey", "Fusion Grey", "Cloud Grey", "Smoke Grey", "Ash Grey", "Dove Grey",
  "Mid Beige", "Soft Beige", "Sand Beige", "Almond Beige", "Stone Beige", "Light Beige",
  "Stone Cream", "Stone White", "Snow White", "Powder White", "Chiffon White", "Arctic White",
  "Murmur White", "Warm Ivory", "Royal Cream", "Butter Cream", "Cream Boucle", "Velvet Mustard",
  "Copper Brown", "Auburn Red", "Navy Blue", "Midnight Navy", "Forest Green", "Olive Green",
  "Pastel Green", "Gainsboro Grey", "Graphite", "Tuscan Sand", "Winter Moss", "Matte Taupe",
  "Matte Anthracite", "Matte Beige Latte", "Antique Gold", "Toffee Brown", "Amber Brown",
  "Light Brown", "Light Oak", "Light Ash", "Walnut Brown", "Ash Oak", "Medium Tan",
"Grey Streaked", "Stone Beige", "Sand Grey", "Pink", "Champagne", "Charcoal", "Emerald",
  "Marble", "Travertine", "Sintered Stone", "Polished", "Antique", "Brushed", "Matte", "Glossy",
  "Milk Coffee", "Walnut", "Veneer", "Teak", "Sheesham", "Oak", "Ash", "Stainless Steel",
  "Silver", "Black", "White", "Cream", "Beige", "Oatmeal", "Ivory", "Tan", "Grey", "Brown",
  "Green", "Blue", "Sand", "Dune", "Boucle", "Velvet", "Velveteen", "Chenille", "Turrel",
  "Dark Bronze",
].sort((a, b) => b.length - a.length);

const TYPE_TOKENS = [
  "Entertainment Unit", "Media Console", "Console Table", "Coffee Table", "Bedside Table",
  "Side Table", "Dining Table", "Bar Table", "Occasional Chair", "Dining Chair", "Lounge Chair",
  "Desk Chair", "Bar Stool", "Counter Stool", "Display Cabinet", "Occasional", "Nightstand",
  "Bookshelf", "Sideboard", "Mattress", "Armoire", "Sectional", "Cabinet", "Dresser", "Tallboy",
  "Ottoman", "Recliner", "Plinth", "Bench", "Stool", "Shelf", "Desk", "Table", "Chair", "Sofa", "Bed",
  "Module", "Seat", "Armless", "Barstool",
].sort((a, b) => b.length - a.length);

const SUBCAT_TYPE = {
  "beds": "Bed",
  "bedside tables": "Bedside Table",
  "side tables": "Table",
  "coffee tables": "Table",
  "console tables": "Console Table",
  "dining tables": "Table",
  "bar": "Bar Cart",
  "bar & counter stools": "Stool",
  "dining chairs": "Chair",
  "occasional chairs": "Chair",
  "fabric sofas": "Sofa",
  "leather sofas": "Sofa",
  "sofas": "Sofa",
  "chairs": "Chair",
  "desks & study": "Desk",
  "ottomans": "Ottoman",
  "outdoor seating": "Outdoor Seating",
  "almirahs & armoires": "Wardrobe",
  "cabinets & media": "Cabinet",
  "display cabinets": "Display Cabinet",
  "sideboards": "Sideboard",
  "dressers & tallboys": "Dresser",
  "media & entertainment": "Media Console",
  "kids": "",
};

function typeDisplay(type, name, subcat) {
  const n = name.toLowerCase();
  if (/set/.test(n) && /table/.test(n)) return "Dining Set";
  if (/mattress/.test(n)) return "Mattress";
  if (/\bsofa\b|sectional|recliner|armless|\bmodule\b|\bseat\b|chaise/.test(n)) return "Sofa";
  if (/\bbed\b|bunk|trundle/.test(n)) return "Bed";
  if (/ottoman/.test(n)) return "Ottoman";
  if (/bench/.test(n)) return "Bench";
  if (/stool/.test(n)) return "Stool";
  if (/\bdesk/.test(n)) return "Desk";
  if (/\bchair/.test(n)) return "Chair";
  if (/plinth/.test(n)) return "Plinth";
  const TYPE_SPECIFIC = {
    "dining table": "Dining Table",
    "coffee table": "Coffee Table",
    "side table": "Side Table",
    "console table": "Console Table",
    "media console": "Media Console",
    "entertainment unit": "Entertainment Unit",
    "bedside table": "Bedside Table",
    "nightstand": "Bedside Table",
    "display cabinet": "Display Cabinet",
    "armoire": "Wardrobe",
  };
  const t = String(type || "").toLowerCase();
  if (TYPE_SPECIFIC[t]) return TYPE_SPECIFIC[t];
  if (/console/.test(n)) return "Console Table";
  if (/nightstand/.test(n)) return "Bedside Table";
  if (/dresser|tallboy/.test(n)) return "Dresser";
  if (/sideboard/.test(n)) return "Sideboard";
  if (/armoire|wardrobe/.test(n)) return "Wardrobe";
  if (/bookshelf/.test(n)) return "Bookshelf";
  if (/\bshelf/.test(n)) return "Shelf";
  if (/cabinet/.test(n)) return "Cabinet";
  if (/\btable/.test(n)) return "Table";
  const hint = SUBCAT_TYPE[(subcat || "").toLowerCase()];
  if (hint) return hint;
  const tt = String(type || "");
  return tt ? tt.charAt(0).toUpperCase() + tt.slice(1) : "Furniture";
}

const TRAILING_MODEL_WORDS = new Set([
  "side", "dining", "bar", "counter", "occasional", "lounge", "accent", "club", "study",
  "office", "storage", "modular", "corner", "chaise", "swivel", "rocker", "electric", "recliner",
  "twin", "convertible", "bunk", "trundle", "media", "display", "closed", "tall", "glass",
  "solid", "wooden", "leather", "vegan", "fabric", "velvet", "boucle", "chenille", "turrel",
  "outdoor", "aluminum", "reclaimed", "railway", "high-back", "low-back", "bentwood", "open",
  "single-leg", "two-leg", "curved", "round", "rectangular", "square", "oval", "full hurdle",
  "mid-century", "5-star", "pedestal", "wood", "two-round", "two-", "and", "tiered", "light",
  "mirror", "mirrored", "with", "l-shaped", "cold", "calacatta", "2-layered",
]);

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanRawName(raw) {
  return raw
    .replace(/[®™]/g, "")
    .replace(/–|—/g, "-")
    .replace(/\s+/g, " ")
    .replace(/^Build Your Own\s*-\s*/i, "")
    .replace(/\((?:[^)]*\d[^)]*)\)/g, "")
    .trim();
}

/** Portion of a name before the first " - " (variant/finish descriptor) */
function coreName(rawName) {
  return cleanRawName(rawName).split(/\s+-\s+/)[0].trim();
}

function extractModel(rawName) {
  let name = coreName(rawName);

  // 1) if a colour phrase appears, model is everything before it
  let colourSplit = -1;
  for (const c of COLOUR_PHRASES) {
    const idx = name.search(new RegExp(`\\b${escapeReg(c)}\\b`, "i"));
    if (idx > 0) colourSplit = colourSplit === -1 ? idx : Math.min(colourSplit, idx);
  }
  let model = name;
  if (colourSplit > 0) model = name.slice(0, colourSplit);

  // 2) otherwise split at the first product-type token
  if (colourSplit === -1) {
    let typeIdx = -1;
    for (const t of TYPE_TOKENS) {
      const idx = name.search(new RegExp(`\\b${escapeReg(t)}s?\\b`, "i"));
      if (idx >= 0) typeIdx = typeIdx === -1 ? idx : Math.min(typeIdx, idx);
    }
    if (typeIdx > 0) model = name.slice(0, typeIdx);
  }

  // 3) trim trailing descriptor words (never below a single word)
  let words = model.split(/\s+/).filter(Boolean);
  let changed = true;
  while (changed && words.length > 1) {
    changed = false;
    const last = words[words.length - 1].toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (/^\d+cm$|^\d+-\s?piece$|^5-star$/i.test(last) || TRAILING_MODEL_WORDS.has(last)) {
      words.pop();
      changed = true;
    }
  }

  model = words.join(" ").trim();
  if (!model || model.length < 2) return "";
  return model;
}

function extractType(rawName) {
  const name = coreName(rawName);
  if (/ottoman/i.test(name)) return "Ottoman";
  for (const t of TYPE_TOKENS) {
    if (new RegExp(`\\b${escapeReg(t)}s?\\b`, "i").test(name)) return t;
  }
  return "";
}

function extractColourPhrase(rawName) {
  const name = coreName(rawName);
  for (const c of COLOUR_PHRASES) {
    if (new RegExp(`\\b${escapeReg(c)}\\b`, "i").test(name)) return c;
  }
  return "";
}

function extractConfiguration(rawName) {
  const name = cleanRawName(rawName);
  const m = name.match(/\b(\d+\s*(?:pieces?|seaters?|seats?))\b/i);
  if (m) return m[1];
  if (/armless/i.test(name)) return "Armless";
  if (/\bcorner\b/i.test(name)) return "Corner";
  if (/chaise/i.test(name)) return "Chaise";
  if (/ottoman/i.test(name)) return "Ottoman";
  if (/king/i.test(name)) return "King";
  if (/queen/i.test(name)) return "Queen";
  if (/\bsingle\b/i.test(name)) return "Single";
  if (/\bdouble\b/i.test(name)) return "Double";
  const dim = name.match(/(\d{2,3}\s*x\s*\d{2,3}\s*cm)/i);
  if (dim) return dim[1].toLowerCase().replace(/\s+/g, " ");
  const cm = name.match(/(\d{2,3}\s*cm)/i);
  if (cm) return cm[1].toLowerCase().replace(/\s+/g, " ");
  return "";
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/* ------------------------------------------------------------------ */
/* 3. Category taxonomy                                                */
/* ------------------------------------------------------------------ */

const CATEGORY_META = {
  beds: { name: "Beds", blurb: "Hand-built wooden, storage and upholstered beds made to your size, finish and headboard design." },
  wardrobes: { name: "Wardrobes & Almirahs", blurb: "Hinged and sliding-door wardrobes and almirahs built to your wall size, with your choice of drawers, mirror and internals." },
  sofas: { name: "Sofas", blurb: "Fabric, leather and modular sofas — from compact two-seaters to corner and recliner configurations." },
  chairs: { name: "Chairs & Seating", blurb: "Accent chairs, armchairs, dining chairs and bar & counter stools in wood, fabric and leather." },
  dining: { name: "Dining", blurb: "Dining tables, chairs and sets — solid wood and engineered, sized for your room." },
  tables: { name: "Coffee & Side Tables", blurb: "Coffee tables, side tables, consoles and bedside tables that anchor a room." },
  storage: { name: "Storage & Cabinets", blurb: "Cabinets, media consoles, bookshelves, dressers and tallboys for every room." },
  office: { name: "Desks & Study", blurb: "Study and work desks with drawers and storage, sized to fit your room." },
  ottomans: { name: "Ottomans & Benches", blurb: "Ottomans, footstools and benches in fabric, leather and wood." },
  kids: { name: "Kids", blurb: "Kids beds, desks, chairs and storage with safe, durable finishes." },
  outdoor: { name: "Outdoor", blurb: "Weather-ready outdoor sofas, tables, chairs and bar stools." },
  mattresses: { name: "Mattresses", blurb: "Quilted-top mattresses to complete your bed." },
};

const SUBCAT_NAMES = {
  "Fabric Sofas": "Fabric Sofas",
  "Leather Sofas": "Leather Sofas",
  "Occasional Chairs": "Occasional Chairs",
  "Dining Chairs": "Dining Chairs",
  "Dining Tables": "Dining Tables",
  "Coffee Tables": "Coffee Tables",
  "Side Tables": "Side Tables",
  "Console Tables": "Console Tables",
  "Counter Stools": "Bar & Counter Stools",
  "Bar Stools": "Bar & Counter Stools",
  "Beds": "Beds",
  "Bedside Tables": "Bedside Tables",
  "Dressers and Tallboys": "Dressers & Tallboys",
  "Ottomans": "Ottomans",
  "Office": "Desks & Study",
  "Entertainment Units": "Media & Entertainment",
  "Almirahs": "Almirahs & Armoires",
  "Cabinets": "Cabinets & Media",
  "Chairs": "Chairs",
  "Sofas": "Sofas",
  "Stools": "Bar & Counter Stools",
  "Display Cabinets": "Display Cabinets",
  "Sideboards": "Sideboards",
  "Outdoor Seating": "Outdoor Seating",
};

function inferCategory(sourcePath, productName) {
  const lower = sourcePath.toLowerCase();
  const name = productName.toLowerCase();

  if (/mattress/.test(name)) return ["mattresses", "Mattresses"];
  if (/outdoor/.test(lower) || /outdoor/.test(name)) return ["outdoor", "Outdoor"];
  if (lower.includes("kids")) return ["kids", "Kids"];

  if (lower.includes("bedside tables")) return ["tables", "Bedside Tables"];
  if (lower.includes("bedroom") && lower.includes("beds")) return ["beds", "Beds"];
  if (lower.includes("dressers and tallboys")) return ["storage", "Dressers & Tallboys"];

  if (lower.includes("fabric sofas") || lower.includes("leather sofas") || lower.endsWith("sofas")) return ["sofas", "Sofas"];
  if (lower.includes("occasional chairs")) return ["chairs", "Occasional Chairs"];
  if (lower.includes("dining chairs")) return ["chairs", "Dining Chairs"];
  if (lower.includes("counter stools") || lower.includes("bar stools") || lower.includes("stools")) return ["chairs", "Bar & Counter Stools"];

  if (lower.includes("dining tables")) return ["dining", "Dining Tables"];
  if (lower.includes("sideboards")) return ["dining", "Sideboards"];
  if (lower.includes("display cabinets")) return ["dining", "Display Cabinets"];
  if (lower.includes("dining/bar")) return ["dining", "Bar"];

  if (lower.includes("coffee tables")) return ["tables", "Coffee Tables"];
  if (lower.includes("side tables")) return ["tables", "Side Tables"];
  if (lower.includes("console tables")) return ["tables", "Console Tables"];

  if (lower.includes("entertainment units")) return ["storage", "Media & Entertainment"];
  if (lower.includes("cabinets")) return ["storage", "Cabinets & Media"];
  if (lower.includes("office")) return ["office", "Desks & Study"];

  if (lower.includes("almirahs")) return ["wardrobes", "Almirahs & Armoires"];
  if (lower.includes("ottomans")) return ["ottomans", "Ottomans"];

  if (lower.includes("chairs")) return ["chairs", "Chairs"];
  if (lower.includes("beds")) return ["beds", "Beds"];
  if (lower.includes("sofas")) return ["sofas", "Sofas"];

  if (/bench/.test(name)) return ["dining", "Benches"];
  if (/table/.test(name)) return ["dining", "Dining Tables"];
  if (/chair/.test(name)) return ["chairs", "Chairs"];
  if (/bed/.test(name)) return ["beds", "Beds"];
  if (/sofa/.test(name)) return ["sofas", "Sofas"];

  return ["unknown", "Unknown"];
}

/* ------------------------------------------------------------------ */
/* 4. Pricing — Craftiva's own published factory-direct bands          */
/* ------------------------------------------------------------------ */

const PRICE_TIERS = {
  beds: { from: 26000, to: 58000, note: "Platform beds from ₹26,000; storage & upholstered beds ₹30,000–₹58,000 by size, wood and storage type." },
  wardrobes: { from: 18000, to: 48000, note: "Compact 2-door almirahs from ₹18,000; 4-door and sliding wardrobes ₹34,000–₹48,000+ by size." },
  dining: { from: 30000, to: 52000, note: "4-seater dining sets from ₹30,000; solid sheesham 6-seater sets ₹52,000." },
  office: { from: 12000, to: 20000, note: "Study and work tables with storage from ₹12,000." },
  storage: { from: 9000, to: 24000, note: "Compact storage cabinets from ₹9,000; cupboards and crockery units ₹24,000." },
};

/* ------------------------------------------------------------------ */
/* 5. Scanning helpers                                                 */
/* ------------------------------------------------------------------ */

function naturalSort(a, b) {
  const num = (s) => parseInt(s, 10) || 0;
  const an = num(a.match(/^(\d+)/)?.[1] || "999999");
  const bn = num(b.match(/^(\d+)/)?.[1] || "999999");
  if (an !== bn) return an - bn;
  return a.localeCompare(b);
}

function listImages(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort(naturalSort);
}

function listSwatches(dir) {
  const sw = join(dir, "swatches");
  if (!existsSync(sw)) return [];
  return readdirSync(sw)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort(naturalSort);
}

function imageRole(file) {
  if (/main|hero/i.test(file)) return "hero";
  if (/lifestyle|interior/i.test(file)) return "lifestyle";
  if (/detail|close|zoom/i.test(file)) return "detail";
  return "gallery";
}

function toImgUrl(relPath) {
  return "/img/" + relPath.split(sep).map((s) => encodeURIComponent(s)).join("/");
}

function relPath(folder) {
  return relative(IMAGES_ROOT, folder).split(sep).join("/");
}

/* ------------------------------------------------------------------ */
/* 6. Main                                                             */
/* ------------------------------------------------------------------ */

if (!existsSync(IMAGES_ROOT)) {
  console.error(`IMAGES_ROOT not found: ${IMAGES_ROOT}`);
  process.exit(1);
}

const reviews = [];
const folders = [];

function walk(dir, depth) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "swatches") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, depth + 1);
    else if (/\.jpe?g$/i.test(entry.name) && depth > 0) folders.push(dir);
  }
}
walk(IMAGES_ROOT, 0);
const uniqueFolders = [...new Set(folders)];

const products = [];
const familyIndex = new Map();
let idCounter = 1;

for (const folder of uniqueFolders) {
  const rel = relPath(folder);
  const folderName = basename(folder);
  const sourcePath = dirname(rel);
  const descPath = join(folder, "description.txt");

  let parsed = { name: folderName, meta: {}, description: "", dims: {} };
  if (existsSync(descPath)) {
    try {
      parsed = parseDescriptionText(readFileSync(descPath, "utf8"));
    } catch {
      reviews.push({ folder: rel, reason: "Unparseable description.txt" });
    }
  } else {
    reviews.push({ folder: rel, reason: "Missing description.txt" });
  }

  const images = listImages(folder);
  const swatches = listSwatches(folder);
  if (images.length === 0) {
    reviews.push({ folder: rel, reason: "No images found" });
    continue;
  }

  const productName = parsed.name || folderName;
  const [catSlug, catName] = inferCategory(sourcePath, productName);
  const subcatName = SUBCAT_NAMES[sourcePath.split("/").pop()] || catName;
  const needsReview = catSlug === "unknown" || !parsed.description;

  const model = extractModel(productName);
  const type = extractType(productName);
  const typeDisp = typeDisplay(type, productName, subcatName);
  const colour = extractColourPhrase(folderName) || parsed.meta.Colour || "";
  const config = extractConfiguration(folderName);

  if (!model) {
    reviews.push({ folder: rel, reason: `Could not determine model: "${folderName}"` });
  }

  let familyName = `${model || folderName} ${typeDisp}`.replace(/\s{2,}/g, " ").trim();
  if (typeDisp !== "Furniture" && model && model.toLowerCase().endsWith(typeDisp.toLowerCase())) {
    familyName = model;
  }
  const familyKey = slugify(familyName);
  const priceTier = PRICE_TIERS[catSlug] || null;

  const imgUrls = images.map((f) => toImgUrl(join(rel, f)));
  const swatchUrls = swatches.map((f) => ({
    name: f.replace(/\.jpe?g$/i, "").trim(),
    url: toImgUrl(join(rel, "swatches", f)),
  }));

  const variant = {
    id: `v-${String(idCounter).padStart(4, "0")}`,
    name: folderName,
    colour,
    configuration: config,
    type: typeDisp,
    _cat: catSlug,
    _subcat: SUBCAT_NAMES[sourcePath.split("/").pop()] || catName,
    images: imgUrls,
    roles: images.map((f) => imageRole(f)),
    hero: imgUrls[0],
    swatchImage: swatchUrls[0]?.url || imgUrls[0],
    colourSwatches: swatchUrls,
    folder: rel,
    referencePrice: parsed.meta.Price || "",
    dims: parsed.dims,
  };

  if (familyIndex.has(familyKey)) {
    const existing = products[familyIndex.get(familyKey)];
    existing.variants.push(variant);
    existing.variantCount += 1;
    continue;
  }

  const name = familyName;
  const price = priceTier
    ? { type: "range", from: priceTier.from, to: priceTier.to, note: priceTier.note, onRequest: false }
    : { type: "on-request", onRequest: true, note: "Made to order. Share your size, wood and finish on WhatsApp for an exact factory-direct quote." };

  const short = parsed.description
    ? parsed.description.split(/\.\s/)[0] + "."
    : "Made to order in our Kirti Nagar workshop.";

  const product = {
    id: `cf-${String(idCounter).padStart(4, "0")}`,
    familyKey,
    slug: slugify(`${name}-${catSlug === "unknown" ? "custom" : catSlug}`),
    name,
    category: { slug: catSlug, name: catName === "Unknown" ? "Custom" : catName },
    subcategory: variant._subcat,
    type: typeDisp,
    shortDescription: short,
    description: parsed.description || "A made-to-order piece from our Kirti Nagar workshop. Share your dimensions, wood and finish for an exact quote.",
    price,
    source: sourcePath.includes("West Elm") ? "westelm" : "koala",
    customizable: true,
    leadTime: "10–15 days (made to order)",
    availability: "Made to order",
    materials: ["Solid wood & premium plywood"].concat(catSlug === "sofas" ? ["Upholstery fabric / leather", "Hardwood frame"] : []),
    tags: [],
    featured: false,
    bestseller: false,
    newArrival: false,
    needsReview,
    variants: [variant],
    variantCount: 1,
  };

  familyIndex.set(familyKey, products.length);
  products.push(product);
  idCounter += 1;
}

// derive variant-level selectors + tags
const mode = (arr) => {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "";
};

for (const p of products) {
  const catSlug = mode(p.variants.map((v) => v._cat));
  const subcat = mode(p.variants.map((v) => v._subcat).filter(Boolean));
  p.category = {
    slug: catSlug,
    name: CATEGORY_META[catSlug]?.name || (catSlug === "unknown" ? "Custom" : catSlug),
  };
  if (subcat) p.subcategory = subcat;

  const colours = [...new Set(p.variants.map((v) => v.colour).filter(Boolean))];
  const configs = [...new Set(p.variants.map((v) => v.configuration).filter(Boolean))];
  p.colourOptions = colours;
  p.configOptions = configs;
  p.hasColourVariants = colours.length > 1;
  p.hasConfigVariants = configs.length > 1;
  p.variantOptions = p.variants.map((v) => ({
    id: v.id,
    label: v.name,
    colour: v.colour || "",
    configuration: v.configuration || "",
  }));

  if (p.category.slug === "beds") p.tags.push("bed");
  if (/storage/i.test(p.name)) p.tags.push("storage");
  if (/hydraulic/i.test(p.name)) p.tags.push("hydraulic");
  if (p.variants.some((v) => /king/i.test(v.name))) p.tags.push("king");
  if (p.variants.some((v) => /queen/i.test(v.name))) p.tags.push("queen");
  if (p.category.slug === "sofas") p.tags.push("sofa");
  if (p.category.slug === "wardrobes") p.tags.push("wardrobe", "almirah");
  if (p.category.slug === "dining") p.tags.push("dining");
  if (p.category.slug === "office") p.tags.push("study-table", "desk");
  if (p.category.slug === "kids") p.tags.push("kids");
  if (p.category.slug === "outdoor") p.tags.push("outdoor");
  p.tags = [...new Set(p.tags)];
}

// category aggregation (mode across variants)
const catMap = new Map();
for (const p of products) {
  const c = catMap.get(p.category.slug) || {
    ...CATEGORY_META[p.category.slug] || { name: p.category.name, blurb: "" },
    slug: p.category.slug,
    products: 0,
    subcategories: new Set(),
    images: 0,
  };
  c.products += 1;
  c.subcategories.add(p.subcategory);
  c.images += p.variants.reduce((a, v) => a + v.images.length, 0);
  catMap.set(p.category.slug, c);
}
const categories = [...catMap.values()]
  .map((c) => ({
    slug: c.slug,
    name: c.name,
    blurb: c.blurb,
    productCount: c.products,
    imageCount: c.images,
    subcategories: [...c.subcategories],
  }))
  .sort((a, b) => b.productCount - a.productCount);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "products.json"), JSON.stringify(products, null, 2));
writeFileSync(join(OUT_DIR, "categories.json"), JSON.stringify(categories, null, 2));
writeFileSync(join(OUT_DIR, "review.json"), JSON.stringify(reviews, null, 2));
writeFileSync(join(OUT_DIR, "meta.json"), JSON.stringify({
  generatedAt: new Date().toISOString(),
  sourceFolders: uniqueFolders.length,
  products: products.length,
  variants: products.reduce((a, p) => a + p.variants.length, 0),
  images: products.reduce((a, p) => a + p.variants.reduce((x, v) => x + v.images.length, 0), 0),
  categories: categories.length,
  needsReview: reviews.length,
  imagesRoot: IMAGES_ROOT,
}, null, 2));

console.log("\nCatalog build complete.");
console.log(`  IMAGES_ROOT : ${IMAGES_ROOT}`);
console.log(`  Folders     : ${uniqueFolders.length}`);
console.log(`  Products    : ${products.length}`);
console.log(`  Variants    : ${products.reduce((a, p) => a + p.variants.length, 0)}`);
console.log(`  Images      : ${products.reduce((a, p) => a + p.variants.reduce((x, v) => x + v.images.length, 0), 0)}`);
console.log(`  Categories  : ${categories.length}`);
console.log(`  Needs review: ${reviews.length}`);
console.log(`  Output      : ${OUT_DIR}`);