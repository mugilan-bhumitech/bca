// Copies every image from the original site's assets/images into public/assets/images,
// keeping the same file names. Photos larger than 2400px are resized and recompressed
// (the three ceremony originals are ~36 MB, 7952px camera files), everything else is copied as-is.
import { readdir, mkdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '../../assets/images');
const out = path.resolve(here, '../public/assets/images');
const MAX = 2400;

await mkdir(out, { recursive: true });

for (const name of await readdir(src)) {
  const from = path.join(src, name);
  const to = path.join(out, name);
  const ext = path.extname(name).toLowerCase();
  const before = (await stat(from)).size;

  if (ext === '.jpg' || ext === '.jpeg') {
    const meta = await sharp(from).metadata();
    if ((meta.width ?? 0) > MAX || before > 1_200_000) {
      await sharp(from).rotate().resize({ width: MAX, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(to);
      const after = (await stat(to)).size;
      console.log(`${name}: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(2)} MB`);
      continue;
    }
  }
  await copyFile(from, to);
  console.log(`${name}: copied`);
}
