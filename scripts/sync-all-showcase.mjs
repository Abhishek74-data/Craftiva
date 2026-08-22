import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targetDir = path.join(root, 'public', 'Catalogue_Images_For_Drive');
const imgDir = path.join(root, 'public', 'img');

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const SHOWCASE_PRODUCTS = [
  {
    prefix: '01_Riviera_Bed',
    folder: 'Images/Koala Catalogue/Bedroom/Beds/Riviera Isabelline White Fabric King Bed with Medium Brown Ash Veneer',
  },
  {
    prefix: '02_Madrid_Bed',
    folder: 'Images/Koala Catalogue/Bedroom/Beds/Madrid Cream Velvet King Bed',
  },
  {
    prefix: '03_Kennedy_Bedside',
    folder: 'Images/Koala Catalogue/Bedroom/Bedside Tables/Kennedy White Sintered Stone 3-Drawer Bedside Table',
  },
  {
    prefix: '04_Archie_Dresser',
    folder: 'Images/Koala Catalogue/Bedroom/Dressers and Tallboys/Archie Black Wooden 6-Drawer Dresser with White Sintered Stone Top',
  },
  {
    prefix: '05_Antonella_Sofa',
    folder: 'Images/Koala Catalogue/Living/Fabric Sofas/Antonella Stone Cream 3-Seater Woven Fabric Sofa',
  },
  {
    prefix: '06_Ava_Sofa',
    folder: 'Images/Koala Catalogue/Living/Fabric Sofas/Ava Cream Fabric 3-Seater Sofa',
  },
  {
    prefix: '07_Elianna_Sofa',
    folder: 'Images/Koala Catalogue/Living/Fabric Sofas/Elianna Stone Cream 3-Seater Woven Fabric Sofa',
  },
  {
    prefix: '08_Kelly_Ottoman',
    folder: 'Images/Koala Catalogue/Living/Ottomans/Kelly Beige Velvet Ottoman',
  },
  {
    prefix: '09_Carlo_Leather_Chair',
    folder: 'Images/West Elm Catalogue/Chairs/Carlo Leather Mid-Century Chair - Wood Legs',
  },
  {
    prefix: '10_Xandra_Entertainment',
    folder: 'Images/Koala Catalogue/Living/Entertainment Units/Xandra Dark Walnut Veneer Entertainment Unit-Brass Handles',
  },
  {
    prefix: '11_Douglas_Tatami_Wardrobe',
    folder: 'Images/West Elm Catalogue/Almirahs/Douglas Solid Wood Tatami Armoire (38 )',
  },
  {
    prefix: '12_Berkely_Fluted_Console',
    folder: 'Images/West Elm Catalogue/Cabinets/Berkely Media Console (80 )',
  },
  {
    prefix: '13_Solid_Sheesham_Dining',
    folder: 'Images/West Elm Catalogue/Dining Tables/Mid-Century Extendable Dining Table (39 –92 )',
  },
  {
    prefix: '14_Hargrove_Round_Dining',
    folder: 'Images/West Elm Catalogue/Dining Tables/Hargrove Round Dining Table (48 , 60 )',
  },
];

console.log('--- Syncing All Real Showcase Images ---');

for (const p of SHOWCASE_PRODUCTS) {
  const fullFolderPath = path.join(root, p.folder);
  if (!fs.existsSync(fullFolderPath)) {
    console.warn(`[WARN] Folder not found: ${fullFolderPath}`);
    continue;
  }

  const files = fs.readdirSync(fullFolderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg')).sort();
  console.log(`Found ${files.length} images for ${p.prefix}`);

  // Copy Main (01)
  const mainFile = files.find(f => f.includes('main') || f.startsWith('01')) || files[0];
  if (mainFile) {
    fs.copyFileSync(path.join(fullFolderPath, mainFile), path.join(targetDir, `${p.prefix}_Main.jpg`));
    fs.copyFileSync(path.join(fullFolderPath, mainFile), path.join(imgDir, `${p.prefix}_Main.jpg`));
  }

  // Copy Lifestyle (last or lifestyle)
  const lifestyleFile = files.find(f => f.includes('lifestyle')) || files[files.length - 1];
  if (lifestyleFile) {
    fs.copyFileSync(path.join(fullFolderPath, lifestyleFile), path.join(targetDir, `${p.prefix}_Lifestyle.jpg`));
    fs.copyFileSync(path.join(fullFolderPath, lifestyleFile), path.join(imgDir, `${p.prefix}_Lifestyle.jpg`));
  }

  // Copy all indexed photos: 01, 02, 03, 04, 05...
  files.forEach((file, idx) => {
    const num = idx + 1;
    const destName = `${p.prefix}_${num}.jpg`;
    fs.copyFileSync(path.join(fullFolderPath, file), path.join(targetDir, destName));
    fs.copyFileSync(path.join(fullFolderPath, file), path.join(imgDir, destName));
  });
}

console.log('✅ Successfully copied all real multi-angle showcase photos!');
