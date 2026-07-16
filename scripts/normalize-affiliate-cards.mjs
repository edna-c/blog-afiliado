/**
 * Padroniza cards afiliados (guias Melhores):
 * - 1254² WebP
 * - fundo sólido #b5b5b5
 * - mesma altura de produto (~78% do card)
 * - pés no mesmo baseline (~5,5% margem inferior)
 * - referência = 1º item da lista `cards`
 *
 * Uso:
 *   bun scripts/normalize-affiliate-cards.mjs
 *   bun scripts/normalize-affiliate-cards.mjs --dir=public/images/melhores/melhor-fogao-mesa-de-vidro
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CARD = 1254;
const BG = { r: 181, g: 181, b: 181 }; // #b5b5b5
const TARGET_H = Math.round(CARD * 0.78);
const BOTTOM_MARGIN = Math.round(CARD * 0.055);

const dirArg = process.argv.find((a) => a.startsWith('--dir='));
const OUT = dirArg
	? dirArg.slice('--dir='.length)
	: 'public/images/melhores/melhor-fogao-mesa-de-vidro';
const SRC = path.join(OUT, '_src');

/** Primeiro item = referência de escala/nível. */
const cards = [
	{ src: 'consul-cfo4var-card-user.png', out: 'consul-cfo4var.webp' },
	{ src: 'brastemp-bfo4vae-card-user.png', out: 'brastemp-bfo4vae.webp' },
	{ src: 'atlas-atenas-glass-card-user.png', out: 'atlas-atenas-glass.webp' },
];

function isBgCandidate(r, g, b, threshold = 165, chromaMax = 50) {
	const avg = (r + g + b) / 3;
	const chroma = Math.max(r, g, b) - Math.min(r, g, b);
	return avg >= threshold && chroma <= chromaMax;
}

async function extractProduct(inputPath) {
	const { data, info } = await sharp(inputPath)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const { width, height } = info;
	const visited = new Uint8Array(width * height);
	const queue = [];

	const push = (x, y) => {
		const idx = y * width + x;
		if (visited[idx]) return;
		const i = idx * 4;
		if (!isBgCandidate(data[i], data[i + 1], data[i + 2])) return;
		visited[idx] = 1;
		queue.push(idx);
	};

	for (let x = 0; x < width; x++) {
		push(x, 0);
		push(x, height - 1);
	}
	for (let y = 0; y < height; y++) {
		push(0, y);
		push(width - 1, y);
	}

	while (queue.length) {
		const idx = queue.pop();
		const x = idx % width;
		const y = (idx / width) | 0;
		data[idx * 4 + 3] = 0;
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (!dx && !dy) continue;
				const nx = x + dx;
				const ny = y + dy;
				if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
				push(nx, ny);
			}
		}
	}

	let grew = true;
	while (grew) {
		grew = false;
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const i = (y * width + x) * 4;
				if (data[i + 3] === 0) continue;
				if (!isBgCandidate(data[i], data[i + 1], data[i + 2], 145, 45)) continue;
				let near = false;
				for (let dy = -1; dy <= 1 && !near; dy++) {
					for (let dx = -1; dx <= 1 && !near; dx++) {
						const nx = x + dx;
						const ny = y + dy;
						if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
						if (data[(ny * width + nx) * 4 + 3] === 0) near = true;
					}
				}
				if (near) {
					data[i + 3] = 0;
					grew = true;
				}
			}
		}
	}

	return sharp(data, { raw: { width, height, channels: 4 } })
		.trim({ threshold: 8 })
		.png()
		.toBuffer();
}

async function main() {
	if (!fs.existsSync(SRC)) {
		console.error('missing _src:', SRC);
		process.exit(1);
	}

	const backdrop = await sharp({
		create: { width: CARD, height: CARD, channels: 3, background: BG },
	})
		.png()
		.toBuffer();

	const samples = {};

	for (const c of cards) {
		const input = path.join(SRC, c.src);
		if (!fs.existsSync(input)) {
			console.error('missing', input);
			process.exit(1);
		}
		const cut = await extractProduct(input);
		const meta = await sharp(cut).metadata();
		const scale = TARGET_H / meta.height;
		let nw = Math.round(meta.width * scale);
		let nh = TARGET_H;
		if (nw > CARD - 8) {
			nw = CARD - 8;
			nh = Math.round(meta.height * (nw / meta.width));
		}
		const resized = await sharp(cut).resize(nw, nh, { fit: 'fill' }).png().toBuffer();
		const rMeta = await sharp(resized).metadata();
		const left = Math.round((CARD - rMeta.width) / 2);
		const top = CARD - BOTTOM_MARGIN - rMeta.height;

		await sharp(backdrop)
			.composite([{ input: resized, left, top }])
			.webp({ quality: 88, effort: 6 })
			.toFile(path.join(OUT, c.out));

		samples[c.out] = { ...BG };
		console.log(
			`${c.out}: trim ${meta.width}x${meta.height} → ${rMeta.width}x${rMeta.height} | top ${top} bottom ${BOTTOM_MARGIN}`,
		);
	}

	fs.writeFileSync(path.join(SRC, 'affiliate-cards-bg-samples.json'), JSON.stringify(samples, null, 2));
	console.log(`done | bg #b5b5b5 | TARGET_H ${TARGET_H} | dir ${OUT}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
