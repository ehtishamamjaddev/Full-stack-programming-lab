/**
 * Downloads furniture images into public/images (run once after clone)
 * Usage: node scripts/download-images.mjs
 */
import { mkdir, writeFile, copyFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/images');

const FILES = {
  'chair.jpg': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
  'chair-2.jpg': 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=80',
  'bed.jpg': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  'table.jpg': 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80',
  'bookcase.jpg': 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80',
  'box.jpg': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  'living.jpg': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  'office.jpg': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
  'coffee-table.jpg': 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80',
  'hero-chair.jpg': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
  'placeholder.jpg': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  'console.jpg': 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80'
};

async function download(name, url) {
  const path = join(outDir, name);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path, buf);
  console.log('OK', name, buf.length);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const fallback = join(outDir, 'living.jpg');
  for (const [name, url] of Object.entries(FILES)) {
    try {
      await download(name, url);
    } catch {
      try {
        await stat(fallback);
        await copyFile(fallback, join(outDir, name));
        console.log('COPY', name, 'from living.jpg');
      } catch {
        await download('living.jpg', FILES['living.jpg']);
        await copyFile(join(outDir, 'living.jpg'), join(outDir, name));
        console.log('COPY', name);
      }
    }
  }
  for (const alias of ['cabinet.jpg', 'dining.jpg', 'blog-wood.jpg', 'blog-dining.jpg']) {
    const p = join(outDir, alias);
    try {
      await stat(p);
    } catch {
      await copyFile(join(outDir, 'living.jpg'), p);
      console.log('ALIAS', alias);
    }
  }
  console.log('Done — images in public/images');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
