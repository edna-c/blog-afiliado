/**
 * Comprime masters dos cards da home (sem alterar dimensão visual perceptível).
 * Cria backup em src/assets/images/cards/.backup-originals/ antes de substituir.
 *
 * Uso: bun run optimize:cards
 */
import { copyFile, mkdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const CARDS_DIR = join(ROOT, 'src/assets/images/cards');
const OUTPUT_DIR = join(CARDS_DIR, 'optimized');
const BACKUP_DIR = join(CARDS_DIR, '.backup-originals');
/** Alinhado a `HOME_PRODUCT_CARD.exportSize` em editorialImageSpecs.ts */
const MAX = 1400;
const QUALITY = 85;

const files = [
	'brastemp-bfs5ncr-card-premium.webp',
	'consul-fe5ig-card-premium.webp',
	'electrolux-cfs5nab-card-premium.webp',
];

await mkdir(BACKUP_DIR, { recursive: true });
await mkdir(OUTPUT_DIR, { recursive: true });

for (const file of files) {
	const input = join(CARDS_DIR, file);
	const backup = join(BACKUP_DIR, file);
	const output = join(OUTPUT_DIR, file);
	const temp = join(OUTPUT_DIR, `.optimize-tmp-${file}`);

	const before = await stat(input);
	await copyFile(input, backup);

	await sharp(input)
		.resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
		.webp({ quality: QUALITY, effort: 6 })
		.toFile(temp);

	// Valida que o ficheiro gerado abre e tem dimensões
	const outMeta = await sharp(temp).metadata();
	if (!outMeta.width || !outMeta.height) {
		await unlink(temp).catch(() => {});
		throw new Error(`${file}: saída inválida após compressão`);
	}

	const after = await stat(temp);
	if (after.size >= before.size) {
		await unlink(temp);
		console.log(`⊘ ${file}: original já é menor ou igual (${Math.round(before.size / 1024)} KB) — mantido`);
		continue;
	}

	await rename(temp, output);
	console.log(
		`✓ ${file}: ${Math.round(before.size / 1024)} KB → ${Math.round(after.size / 1024)} KB (${outMeta.width}×${outMeta.height}) → optimized/`,
	);
}

console.log('\nSaída:', OUTPUT_DIR);
console.log('Backup dos masters pesados:', BACKUP_DIR);
console.log('(Opcional) Com o dev parado, pode apagar os .webp antigos na raiz de cards/.');
