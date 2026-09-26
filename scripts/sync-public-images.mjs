import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_IMG = path.join(ROOT, "public", "img");
const IMAGES = path.join(ROOT, "Images");

const raw = fs.readFileSync(path.join(ROOT, "data", "catalog", "products.json"), "utf8");
const parsed = JSON.parse(raw);
const products = Array.isArray(parsed) ? parsed : (parsed.products ?? []);

const missing = new Map();
let totalRefs = 0;
for (const product of products) {
  for (const variant of product.variants ?? []) {
    for (const img of variant.images ?? []) {
      totalRefs += 1;
      const rel = decodeURIComponent(String(img).replace(/^\/img\//, ""));
      const dest = path.join(PUBLIC_IMG, rel);
      if (!fs.existsSync(dest) && !missing.has(rel)) missing.set(rel, path.join(IMAGES, rel));
    }
  }
}

const targets = [...missing.entries()].filter(([, src]) => fs.existsSync(src));
const absent = [...missing.entries()].filter(([, src]) => !fs.existsSync(src));

console.log(`refs=${totalRefs} missing=${missing.size} processable=${targets.length} absent=${absent.length}`);
if (absent.length) console.log("absent sample:", absent.slice(0, 5).map(([r]) => r));

const CONCURRENCY = 8;
let done = 0;
let bytesOut = 0;
let bytesIn = 0;
let failed = 0;

async function processOne([rel, src]) {
  try {
    const dest = path.join(PUBLIC_IMG, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    bytesIn += fs.statSync(src).size;
    const buf = await sharp(src)
      .rotate()
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(dest, buf);
    bytesOut += buf.length;
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${rel}: ${err.message}`);
  } finally {
    done += 1;
    if (done % 500 === 0 || done === targets.length) {
      console.log(
        `${done}/${targets.length}  in=${(bytesIn / 1073741824).toFixed(2)}GB out=${(bytesOut / 1073741824).toFixed(2)}GB failed=${failed}`,
      );
    }
  }
}

let index = 0;
async function worker() {
  while (index < targets.length) {
    const item = targets[index++];
    await processOne(item);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

console.log(
  `DONE processed=${done - failed}/${targets.length} failed=${failed} in=${(bytesIn / 1073741824).toFixed(2)}GB out=${(bytesOut / 1073741824).toFixed(2)}GB`,
);
