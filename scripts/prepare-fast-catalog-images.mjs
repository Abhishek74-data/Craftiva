import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcImagesDir = path.join(root, 'Images');
const destImgDir = path.join(root, 'public', 'img');

console.log('--- Syncing Multi-Angle Product Photos (1 to 5 + Lifestyle) for ALL Products ---');

// 1. Clean destination directory
if (fs.existsSync(destImgDir)) {
  fs.rmSync(destImgDir, { recursive: true, force: true });
}
fs.mkdirSync(destImgDir, { recursive: true });

let copiedCount = 0;
let totalBytes = 0;

function walkAndCopyMultiAngle(dir, relPath = '') {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries.filter(e => e.isFile() && /\.(jpg|jpeg|png|webp|avif)$/i.test(e.name));
  const subdirs = entries.filter(e => e.isDirectory());

  if (files.length > 0) {
    const destDir = path.join(destImgDir, relPath);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    // Copy up to 5 multi-angle photos (01, 02, 03, 04, 05), main, lifestyle, and swatches
    const multiAngleFiles = files.filter(f => {
      const name = f.name.toLowerCase();
      return (
        name.includes('main') ||
        name.includes('lifestyle') ||
        name.startsWith('01') ||
        name.startsWith('02') ||
        name.startsWith('03') ||
        name.startsWith('04') ||
        name.startsWith('05') ||
        name.startsWith('1.') ||
        name.startsWith('2.') ||
        name.startsWith('3.') ||
        name.startsWith('4.') ||
        name.startsWith('5.') ||
        relPath.toLowerCase().includes('swatch')
      );
    });

    const toCopy = multiAngleFiles.length > 0 ? multiAngleFiles : files.slice(0, 5);

    for (const f of toCopy) {
      const src = path.join(dir, f.name);
      const dest = path.join(destDir, f.name);
      fs.copyFileSync(src, dest);
      totalBytes += fs.statSync(src).size;
      copiedCount++;
    }
  }

  for (const s of subdirs) {
    walkAndCopyMultiAngle(path.join(dir, s.name), path.join(relPath, s.name));
  }
}

walkAndCopyMultiAngle(srcImagesDir);

console.log(`✅ Successfully synced ${copiedCount} multi-angle product photos!`);
console.log(`📊 Total size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
