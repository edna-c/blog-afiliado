/**
 * Gera os 3 cards afiliados (mesa de vidro): cover 1254² fundo original.
 * Nomes oficiais: {marca}-{sku}.webp
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT = 'public/images/melhores/melhor-fogao-mesa-de-vidro';
const SRC = path.join(OUT, '_src');
const CARD_SIZE = 1254;

const cards = [
	{
		src: 'consul-cfo4var-card-user.png',
		out: 'consul-cfo4var.webp',
	},
	{
		src: 'brastemp-bfo4vae-card-user.png',
		out: 'brastemp-bfo4vae.webp',
	},
	{
		src: 'atlas-atenas-glass-card-user.png',
		out: 'atlas-atenas-glass.webp',
	},
];

async function sampleEdgeBg(inputPath) {
	const { data, info } = await sharp(inputPath)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const { width: w, height: h } = info;
	const margin = Math.max(4, Math.floor(Math.min(w, h) * 0.1));
	let sr = 0;
	let sg = 0;
	let sb = 0;
	let n = 0;
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			if (x >= margin && y >= margin && x < w - margin && y < h - margin) continue;
			const i = (y * w + x) * 4;
			sr += data[i];
			sg += data[i + 1];
			sb += data[i + 2];
			n++;
		}
	}
	return {
		r: Math.round(sr / n),
		g: Math.round(sg / n),
		b: Math.round(sb / n),
	};
}

function hex({ r, g, b }) {
	return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const samples = {};

for (const card of cards) {
	const input = path.join(SRC, card.src);
	if (!fs.existsSync(input)) {
		console.error('missing', input);
		process.exit(1);
	}
	const meta = await sharp(input).metadata();
	const bg = await sampleEdgeBg(input);
	samples[card.out] = bg;

	await sharp(input)
		.resize(CARD_SIZE, CARD_SIZE, { fit: 'cover', position: 'centre' })
		.webp({ quality: 88, effort: 6 })
		.toFile(path.join(OUT, card.out));

	console.log(
		`${card.out}: src ${meta.width}x${meta.height} ${meta.format} → ${CARD_SIZE}² cover | bg ${hex(bg)}`,
	);
}

fs.writeFileSync(
	path.join(SRC, 'affiliate-cards-bg-samples.json'),
	JSON.stringify(samples, null, 2),
);
console.log('done');
