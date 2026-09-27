/**
 * Generates responsive width variants used by <img srcSet> (no Next image
 * optimizer involved — plain static files served by the CDN).
 *
 *   card images : <src>.480.jpg  <src>.800.jpg
 *   premium     : <src>.800.jpg  <src>.1600.jpg
 *
 * Sources narrower than a target width still get the file (sharp runs with
 * withoutEnlargement) so a srcset candidate never 404s; quality never exceeds
 * the original. Idempotent: existing variants are skipped unless --force.
 *
 * Run: node scripts/gen-responsive.mjs [--force]
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CARD_WIDTHS = [480, 800];
const PREMIUM_WIDTHS = [480, 800, 1600];
const QUALITY = 82;
const FORCE = process.argv.includes("--force");
const CONCURRENCY = 6;

function variantPath(file, w) {
  const ext = path.extname(file);
  return `${file.slice(0, -ext.length)}.${w}${ext}`;
}

function collectCardSources() {
  const products = JSON.parse(fs.readFileSync("data/catalog/products.json", "utf8"));
  const set = new Set();
  for (const p of products) {
    for (const v of p.variants || []) {
      for (const img of (v.images || []).filter(Boolean).slice(0, 3)) set.add(img);
    }
  }
  return [...set].map((src) => "public" + decodeURIComponent(src));
}

function collectPremiumSources() {
  return fs
    .readdirSync("public/premium")
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => path.join("public/premium", f));
}

async function worker(queue, done) {
  while (queue.length) {
    const { file, widths } = queue.shift();
    const meta = await sharp(file).metadata();
    for (const w of widths) {
      // Never emit a "larger" variant that would only be a re-encoded original.
      if (w === 1600 && (meta.width || 0) <= 1600) continue;
      const out = variantPath(file, w);
      if (!FORCE && fs.existsSync(out)) continue;
      await sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
        .toFile(out);
      done.created++;
    }
    done.processed++;
    if (done.processed % 500 === 0) console.error(`  ${done.processed}/${done.total}…`);
  }
}

const cards = collectCardSources().filter((f) => fs.existsSync(f));
const premium = collectPremiumSources();
const queue = [
  ...cards.map((file) => ({ file, widths: CARD_WIDTHS })),
  ...premium.map((file) => ({ file, widths: PREMIUM_WIDTHS })),
];
const done = { processed: 0, created: 0, total: queue.length };
console.error(`Generating variants for ${cards.length} card images + ${premium.length} premium images…`);
await Promise.all(
  Array.from({ length: CONCURRENCY }, () => worker(queue, done)),
);
console.error(`Done: ${done.total} sources → ${done.created} new variant files.`);
