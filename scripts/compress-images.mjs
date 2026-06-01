import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const INPUT_DIR  = 'd:\\file_hyebinkim\\development\\cnsdesign\\public\\portpolio';
const MAX_PX     = 2000;
const QUALITY    = 82;

async function* walk(dir) {
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    const s    = await stat(full);
    if (s.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let count = 0;
let saved = 0;

for await (const file of walk(INPUT_DIR)) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

  const before = (await stat(file)).size;

  try {
    const img = sharp(file);
    const meta = await img.metadata();

    const needsResize = (meta.width ?? 0) > MAX_PX || (meta.height ?? 0) > MAX_PX;

    let pipeline = needsResize
      ? img.resize(MAX_PX, MAX_PX, { fit: 'inside', withoutEnlargement: true })
      : img;

    // Always re-encode to compress
    const buf = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

    // Only write if we actually made it smaller
    if (buf.length < before) {
      const { writeFile } = await import('fs/promises');
      await writeFile(file, buf);
      saved += before - buf.length;
      console.log(`  ✓ ${file.split('portpolio')[1]} — ${(before/1e6).toFixed(1)}MB → ${(buf.length/1e6).toFixed(1)}MB`);
    } else {
      console.log(`  – ${file.split('portpolio')[1]} — already small, skipped`);
    }
    count++;
  } catch (e) {
    console.error(`  ✗ ${file}: ${e.message}`);
  }
}

console.log(`\nDone: ${count} files, ${(saved/1e6).toFixed(1)} MB freed`);
