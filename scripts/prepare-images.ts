import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/images', { recursive: true });
for (const name of ['exterior','living','dining','bedroom','terrace','detail']) {
  const input = `assets/source/${name}.${name === 'exterior' ? 'jpg' : 'png'}`;
  for (const width of [640,1280]) {
    const out = `public/images/${name}-${width}.webp`;
    const result = await sharp(input).resize({ width }).webp({ quality: 82 }).toFile(out);
    console.log(`${out}: ${Math.round(result.size / 1024)} KB`);
  }
}
