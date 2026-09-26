import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const IMG_DIR = path.join(process.cwd(), "public", "img");
const CATALOG = path.join(process.cwd(), "data", "catalog", "products.json");

const norm = (s) => s.split(path.sep).join("/").replace(/\\/g, "/");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function md5(file) {
  return crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex");
}

const products = JSON.parse(fs.readFileSync(CATALOG, "utf8"));

const encodedByPath = new Map();
(function collect(value) {
  if (typeof value === "string" && value.startsWith("/img/")) {
    const rel = norm(decodeURIComponent(value.slice("/img/".length)));
    if (!encodedByPath.has(rel)) encodedByPath.set(rel, value);
  } else if (Array.isArray(value)) {
    for (const item of value) collect(item);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collect(item);
  }
})(products);

const referenced = new Set(encodedByPath.keys());
const files = walk(IMG_DIR);

let removedUnused = 0;
let removedDupes = 0;
const hashByPath = new Map();
const pathsByHash = new Map();

for (const file of files) {
  const rel = norm(path.relative(IMG_DIR, file));
  if (!referenced.has(rel)) {
    fs.rmSync(file);
    removedUnused += 1;
    continue;
  }
  const hash = md5(file);
  hashByPath.set(rel, hash);
  if (!pathsByHash.has(hash)) pathsByHash.set(hash, []);
  pathsByHash.get(hash).push(rel);
}

const canonicalOfPath = new Map();
for (const [, paths] of pathsByHash) {
  const sorted = paths.slice().sort();
  const canonical = sorted[0];
  for (const p of sorted) canonicalOfPath.set(p, canonical);
}

let rewritten = 0;
function rewrite(value) {
  if (typeof value === "string" && value.startsWith("/img/")) {
    const rel = norm(decodeURIComponent(value.slice("/img/".length)));
    const canonical = canonicalOfPath.get(rel);
    if (canonical && canonical !== rel) {
      rewritten += 1;
      return encodedByPath.get(canonical);
    }
    return value;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = rewrite(value[i]);
    return value;
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) value[key] = rewrite(value[key]);
    return value;
  }
  return value;
}
rewrite(products);

for (const [, paths] of pathsByHash) {
  const canonical = canonicalOfPath.get(paths[0]);
  for (const rel of paths) {
    if (rel === canonical) continue;
    fs.rmSync(path.join(IMG_DIR, rel));
    removedDupes += 1;
  }
}

fs.writeFileSync(CATALOG, JSON.stringify(products, null, 2) + "\n");

console.log(`removedUnused=${removedUnused} removedDuplicates=${removedDupes} refsRewritten=${rewritten}`);

const remaining = walk(IMG_DIR).length;
console.log(`public/img files: ${files.length} -> ${remaining}`);
