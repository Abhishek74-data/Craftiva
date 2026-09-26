import fs from "node:fs";
import path from "node:path";

/* Curated Unsplash photos (Unsplash License: free for commercial use, no
   attribution required). Downloaded locally so the site never hotlinks. */

const OUT = path.join(process.cwd(), "public", "premium");

const LIST = [
  // ---- Hero + page banners (wide) ----
  {
    file: "hero-living-room.jpg",
    photo: "photo-1613545325268-9265e1609167",
    w: 2600,
    h: 1400,
    credit: { id: "95UK5aVgx98", author: "Zac Gudakov" },
  },
  {
    file: "banner-bedroom.jpg",
    photo: "photo-1616594039964-ae9021a400a0",
    w: 2400,
    h: 1200,
    credit: { id: "RUvW1KGD9a4", author: "Spacejoy" },
  },
  {
    file: "banner-dining.jpg",
    photo: "photo-1600488999806-8efb986d87b1",
    w: 2400,
    h: 1200,
    credit: { id: "v9096DgeVeA", author: "Collov Home Design" },
  },
  {
    file: "banner-craft.jpg",
    photo: "photo-1631396326838-de37e5f8bcbc",
    w: 2400,
    h: 1200,
    credit: { id: "DfffcjQ106U", author: "Unsplash" },
  },
  {
    file: "showroom.jpg",
    photo: "photo-1687180497716-5872969e5125",
    w: 1600,
    h: 1200,
    credit: { id: "75yyUu7BVlo", author: "Albero Furniture Bratislava" },
  },
  {
    file: "craft-hands.jpg",
    photo: "photo-1779031242469-ef2e794987b0",
    w: 1400,
    h: 1050,
    credit: { id: "P4mxT-OgYho", author: "Minh Duc" },
  },

  // ---- Category room tiles (4:3) ----
  { file: "cat-beds.jpg", photo: "photo-1505693416388-ac5ce068fe85", w: 1200, h: 900, credit: { id: "iAftdIcgpFc", author: "Unsplash" } },
  { file: "cat-wardrobes.jpg", photo: "photo-1649361811423-a55616f7ab11", w: 1200, h: 900, credit: { id: "9KVtDmNnFP4", author: "Unsplash" } },
  { file: "cat-sofas.jpg", photo: "photo-1613545325278-f24b0cae1224", w: 1200, h: 900, credit: { id: "ztWpwTEx728", author: "Zac Gudakov" } },
  { file: "cat-dining.jpg", photo: "photo-1604578762246-41134e37f9cc", w: 1200, h: 900, credit: { id: "NFbwes_e-jI", author: "Unsplash" } },
  { file: "cat-tables.jpg", photo: "photo-1563637329737-328724d1394d", w: 1200, h: 900, credit: { id: "d74sP6dnt_I", author: "Unsplash" } },
  { file: "cat-chairs.jpg", photo: "photo-1586023492125-27b2c045efd7", w: 1200, h: 900, credit: { id: "_HqHX3LBN18", author: "Unsplash" } },
  { file: "cat-storage.jpg", photo: "photo-1628152371231-936cf45eb8f3", w: 1200, h: 900, credit: { id: "TWOnvtstmeU", author: "Unsplash" } },
  { file: "cat-office.jpg", photo: "photo-1616593918824-4fef16054381", w: 1200, h: 900, credit: { id: "3z_61bnbFhM", author: "Unsplash" } },
  { file: "cat-ottomans.jpg", photo: "photo-1557124816-e9b7d5440de2", w: 1200, h: 900, credit: { id: "_Bu9-gqYpwg", author: "Unsplash" } },
  { file: "cat-kids.jpg", photo: "photo-1600493504483-8df7098b5792", w: 1200, h: 900, credit: { id: "0dXbMlfLI_8", author: "Unsplash" } },
];

fs.mkdirSync(OUT, { recursive: true });

const credits = [];
for (const item of LIST) {
  const url = `https://images.unsplash.com/${item.photo}?w=${item.w}&h=${item.h}&fit=crop&crop=entropy&q=80&fm=jpg&auto=format`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${res.status} ${item.file}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(OUT, item.file), buf);
  credits.push({ file: item.file, ...item.credit, source: `https://unsplash.com/photos/${item.credit.id}` });
  console.log(`${item.file.padEnd(24)} ${(buf.length / 1024).toFixed(0)} KB  ${item.w}x${item.h}`);
}

fs.writeFileSync(
  path.join(process.cwd(), "data", "premium-credits.json"),
  JSON.stringify({ license: "Unsplash License — free for commercial use, no attribution required", photos: credits }, null, 2) + "\n",
);
console.log(`\n${credits.length} images saved to public/premium`);