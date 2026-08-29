/**
 * Font pipeline: OTF/TTF  ->  subset  ->  woff2.
 *
 * Run with `npm run fonts`. Sources live in ./fonts-src (committed, so the
 * pipeline is reproducible); override with the FONT_SRC env var.
 *
 * Two things happen here, and both matter:
 *
 * 1. SUBSETTING. The originals carry glyphs for languages this site will
 *    never render. Garamontio-Regular is 468KB; the site needs Latin plus
 *    Romanian diacritics, which is a fraction of that. Subsetting is where
 *    almost all of the saving comes from — far more than the format change.
 *
 * 2. WOFF2. Browsers should never be served OTF/TTF. woff2 is Brotli-
 *    compressed and renders identically.
 */
import subsetFont from 'subset-font';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SOURCE_DIR = process.env.FONT_SRC ?? join(root, 'fonts-src');

const OUT_DIR = join(root, 'public', 'fonts');

/* ── Character set ──────────────────────────────────────────────────────
   Latin-1 plus the characters Romanian actually needs. Note that Romanian
   ș/ț are U+0218–U+021B (comma below) — NOT the Turkish cedilla forms at
   U+015E–U+0163. Legacy documents and some keyboards still produce the
   cedilla versions, so both are kept; dropping them would render tofu on
   text pasted in from Word. */
const ranges = [
  [0x20, 0x7e], // ASCII printable
  [0xa0, 0xff], // Latin-1 Supplement
  [0x0100, 0x017f], // Latin Extended-A (includes Ăă, Şş, Ţţ)
  [0x0218, 0x021b], // Romanian Șș Țț, comma below
];

const extras = [
  '\u2010\u2011\u2012\u2013\u2014\u2015', // hyphens and dashes
  '\u2018\u2019\u201A\u201C\u201D\u201E', // smart quotes (RO uses „ ”)
  '\u2020\u2021\u2022\u2026\u2030\u2039\u203A', // dagger, bullet, ellipsis…
  '\u20AC\u20B9\u2116\u2122\u2212', // €, №, ™, minus
  '\u00A0\u202F', // nbsp, narrow nbsp
];

let chars = '';
for (const [start, end] of ranges) {
  for (let cp = start; cp <= end; cp++) chars += String.fromCodePoint(cp);
}
chars += extras.join('');

/* ── Files ──────────────────────────────────────────────────────────────*/
const FONTS = [
  { src: 'Vollda-Bold.otf', out: 'vollda-bold.woff2' },
  { src: 'Garamontio-Regular.otf', out: 'garamontio-regular.woff2' },
  { src: 'Garamontio-RegularItalic.otf', out: 'garamontio-italic.woff2' },
  { src: 'Garamontio-SemiBold.otf', out: 'garamontio-semibold.woff2' },
];

const kb = (bytes) => (bytes / 1024).toFixed(1).padStart(7) + ' KB';

await mkdir(OUT_DIR, { recursive: true });

let before = 0;
let after = 0;

for (const font of FONTS) {
  const original = await readFile(join(SOURCE_DIR, font.src));
  const subset = await subsetFont(original, chars, { targetFormat: 'woff2' });

  await writeFile(join(OUT_DIR, font.out), subset);

  before += original.length;
  after += subset.length;

  const saved = (100 - (subset.length / original.length) * 100).toFixed(0);
  console.log(
    `${font.src.padEnd(30)} ${kb(original.length)} -> ${kb(subset.length)}  (-${saved}%)`
  );
}

console.log('-'.repeat(64));
console.log(
  `${'TOTAL'.padEnd(30)} ${kb(before)} -> ${kb(after)}  ` +
    `(-${(100 - (after / before) * 100).toFixed(0)}%)`
);
