import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CATALOG_DIR = path.join(ROOT, "data", "catalog");
const PUBLIC_IMG = path.join(ROOT, "public", "img");

const removeSlugs = process.argv.slice(2);
if (removeSlugs.length === 0) {
  console.error("Usage: node scripts/remove-categories.mjs <slug> [slug...]");
  process.exit(1);
}
const REMOVE = new Set(removeSlugs);

const products = JSON.parse(fs.readFileSync(path.join(CATALOG_DIR, "products.json"), "utf8"));
const categories = JSON.parse(fs.readFileSync(path.join(CATALOG_DIR, "categories.json"), "utf8"));
const meta = JSON.parse(fs.readFileSync(path.join(CATALOG_DIR, "meta.json"), "utf8"));

const norm = (s) => s.split("\\").join("/");

function imgRefs(list) {
  const refs = new Set();
  (function walk(value) {
    if (typeof value === "string") {
      if (value.startsWith("/img/")) refs.add(norm(decodeURIComponent(value.slice(5))));
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  })(list);
  return refs;
}

const kept = products.filter((p) => !REMOVE.has(p.category.slug));
const removed = products.filter((p) => REMOVE.has(p.category.slug));

const keptRefs = imgRefs(kept);
const removedRefs = imgRefs(removed);

const deletable = [...removedRefs].filter((rel) => !keptRefs.has(rel));
const shared = [...removedRefs].filter((rel) => keptRefs.has(rel));

let deleted = 0;
let bytes = 0;
const missing = [];
for (const rel of deletable) {
  const file = path.join(PUBLIC_IMG, rel);
  if (fs.existsSync(file)) {
    bytes += fs.statSync(file).size;
    fs.rmSync(file);
    deleted += 1;
  } else {
    missing.push(rel);
  }
}

// prune now-empty directories
function pruneEmpty(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return true;
  }
  let empty = true;
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!pruneEmpty(full)) empty = false;
    } else {
      empty = false;
    }
  }
  if (empty && dir !== PUBLIC_IMG) fs.rmdirSync(dir);
  return empty;
}
pruneEmpty(PUBLIC_IMG);

const keptCategories = categories.filter((c) => !REMOVE.has(c.slug));

fs.writeFileSync(path.join(CATALOG_DIR, "products.json"), JSON.stringify(kept, null, 2) + "\n");
fs.writeFileSync(path.join(CATALOG_DIR, "categories.json"), JSON.stringify(keptCategories, null, 2) + "\n");
fs.writeFileSync(
  path.join(CATALOG_DIR, "meta.json"),
  JSON.stringify(
    {
      ...meta,
      products: kept.length,
      variants: kept.reduce((a, p) => a + (p.variants?.length ?? 0), 0),
      images: kept.reduce(
        (a, p) => a + (p.variants ?? []).reduce((x, v) => x + (v.images?.length ?? 0), 0),
        0,
      ),
      categories: keptCategories.length,
    },
    null,
    2,
  ) + "\n",
);

console.log(`removed products: ${removed.length}`);
console.log(`removed categories: ${categories.length - keptCategories.length}`);
console.log(`image files deleted: ${deleted} (${(bytes / 1048576).toFixed(1)} MB)`);
console.log(`shared images kept: ${shared.length}`);
if (missing.length) console.log(`already absent: ${missing.length}`);
console.log(`remaining products: ${kept.length}`);