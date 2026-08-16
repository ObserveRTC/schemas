import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Tell Node how to read each build.
 *
 * The package as a whole is CommonJS, so `dist/cjs` needs no marker — but
 * `dist/esm` holds real ES modules and Node decides that from the nearest
 * package.json, not from the `exports` entry that led it there.
 */
const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

await writeFile(
	path.join(distDir, 'esm', 'package.json'),
	`${JSON.stringify({ type: 'module' }, null, 2)}\n`,
);

await writeFile(
	path.join(distDir, 'cjs', 'package.json'),
	`${JSON.stringify({ type: 'commonjs' }, null, 2)}\n`,
);

console.log('wrote dist/esm/package.json and dist/cjs/package.json');
