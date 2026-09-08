/**
 * compress-hero.js
 * Compresses hero-bg.webp to the minimum acceptable quality for web delivery.
 * Run with: node scripts/compress-hero.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT  = path.join(__dirname, '../public/hero-bg.webp');
const OUTPUT = path.join(__dirname, '../public/hero-bg.webp');
const BACKUP = path.join(__dirname, '../public/hero-bg-original.webp');

async function main() {
  const before = fs.statSync(INPUT).size;

  // Backup original
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(INPUT, BACKUP);
    console.log('✅ Backup saved to hero-bg-original.webp');
  }

  // Read original (from backup to always start fresh)
  const src = fs.existsSync(BACKUP) ? BACKUP : INPUT;
  const metadata = await sharp(src).metadata();
  console.log(`📐 Original: ${metadata.width}x${metadata.height} — ${(before/1024).toFixed(1)} KB`);

  // Strategy: resize to max 1600px wide (sufficient for 52vw @ 4K), quality 68, strip metadata
  await sharp(src)
    .resize({
      width: 1600,
      height: null,
      withoutEnlargement: true,
      fit: 'inside',
    })
    .webp({
      quality: 68,
      effort: 6,         // higher effort = better compression (0-6)
      lossless: false,
    })
    .toFile(OUTPUT);

  const after = fs.statSync(OUTPUT).size;
  const saving = (((before - after) / before) * 100).toFixed(1);

  console.log(`✅ Output: ${(after/1024).toFixed(1)} KB (saved ${saving}%)`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
