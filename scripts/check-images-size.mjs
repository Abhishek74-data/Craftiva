import fs from 'node:fs';
import path from 'node:path';

function getDirSize(dir) {
  let size = 0;
  let count = 0;
  function walk(d) {
    if (!fs.existsSync(d)) return;
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile()) {
        size += fs.statSync(full).size;
        count++;
      }
    }
  }
  walk(dir);
  return { sizeMB: (size / (1024 * 1024)).toFixed(2), count };
}

const imagesPath = path.join(process.cwd(), 'Images');
console.log('Images folder stats:', getDirSize(imagesPath));
