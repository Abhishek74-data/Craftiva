import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const productsPath = path.join(root, 'data', 'catalog', 'products.json');
const srcImagesDir = path.join(root, 'Images');
const destImgDir = path.join(root, 'public', 'img');

if (!fs.existsSync(productsPath)) {
  console.error('products.json not found!');
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Collect all unique image paths referenced in the catalog
const neededImages = new Set();

for (const p of products) {
  for (const v of p.variants || []) {
    if (v.hero) neededImages.add(v.hero);
    if (v.swatchImage) neededImages.add(v.swatchImage);
    for (const img of v.images || []) {
      if (img) neededImages.add(img);
    }
  }
}

console.log(`Total unique image paths referenced in catalog: ${neededImages.size}`);

// Clean destination directory first to remove the 4.19GB bloated files
if (fs.existsSync(destImgDir)) {
  fs.rmSync(destImgDir, { recursive: true, force: true });
}
fs.mkdirSync(destImgDir, { recursive: true });

let copied = 0;
let missing = 0;
let totalBytes = 0;

for (const rawPath of neededImages) {
  // rawPath is like: "/img/Koala Catalogue/Bedroom/Beds/Antonella.../01_main.jpg"
  // or URL encoded: "/img/Koala%20Catalogue/..."
  const decoded = decodeURIComponent(rawPath);
  
  // Strip leading "/img/" or "/"
  let relPath = decoded.replace(/^\/img\//, '').replace(/^\//, '');
  
  // Find source file inside Images/
  const srcFile = path.join(srcImagesDir, relPath);
  const destFile = path.join(destImgDir, relPath);

  if (fs.existsSync(srcFile)) {
    const destFolder = path.dirname(destFile);
    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });
    
    fs.copyFileSync(srcFile, destFile);
    totalBytes += fs.statSync(srcFile).size;
    copied++;
  } else {
    missing++;
  }
}

console.log(`✅ Successfully copied ${copied} exact required catalog images.`);
console.log(`📊 Total size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB (Optimized for Git & Vercel!)`);
if (missing > 0) console.log(`ℹ️ Missing from disk: ${missing}`);
