import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'Images');
const destDir = path.join(root, 'public', 'img');

console.log('--- Copying ALL Original Catalog Images to public/img for Vercel CDN ---');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      // Copy all image files
      if (/\.(jpg|jpeg|png|webp|avif|gif)$/i.test(entry.name)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

copyDirRecursive(srcDir, destDir);

console.log('✅ ALL original images successfully synced to public/img!');
