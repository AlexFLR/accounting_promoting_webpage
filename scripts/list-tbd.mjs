/**
 * Lists every unfilled figure on the site. Run with `npm run tbd`.
 *
 * Thresholds, deadlines and prices are never invented — pages mark them with
 * <Tbd label="..."> instead. This is the checklist of what still needs a real
 * number before launch.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC = join(ROOT, 'src');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(astro|md|mdx)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(SRC);
const found = [];

for (const file of files) {
  const text = await readFile(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/<Tbd\s+label="([^"]+)"/g)) {
      found.push({ file: relative(ROOT, file).split(String.fromCharCode(92)).join("/"), line: i + 1, label: m[1] });
    }
  });
}


found.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

if (found.length === 0) {
  console.log('No placeholders left.');
} else {
  let current = '';
  for (const f of found) {
    if (f.file !== current) {
      current = f.file;
      console.log(`\n${current}`);
    }
    console.log(`  ${String(f.line).padStart(4)}  ${f.label}`);
  }
  console.log(`\n${found.length} placeholder${found.length === 1 ? '' : 's'} to fill.`);
}
