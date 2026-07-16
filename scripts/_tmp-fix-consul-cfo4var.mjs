/**
 * Temp: hard-cut Consul CFO4VAR bg + kill mid-gray shadow islands → #ddd webp
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC =
	'public/images/melhores/melhor-fogao-mesa-de-vidro/_src/consul-cfo4var-card-user.png';
const OUT =
	'public/images/melhores/melhor-fogao-mesa-de-vidro/consul-cfo4var.webp';
const CARD = 1254;
const BG = { r: 221, g: 221, b: 221 };

function isBgCandidate(r, g, b, threshold, chromaMax) {
	const avg = (r + g + b) / 3;
	const chroma = Math.max(r, g, b) - Math.min(r, g, b);
	return avg >= threshold && chroma <= chromaMax;
}

async function main() {
	const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const { width, height } = info;
	const n = width * height;
	const visited = new Uint8Array(n);
	const queue = [];

	const threshold = 155;
	const chromaMax = 55;

	const push = (x, y) => {
		const idx = y * width + x;
		if (visited[idx]) return;
		const i = idx * 4;
		if (!isBgCandidate(data[i], data[i + 1], data[i + 2], threshold, chromaMax)) return;
		visited[idx] = 1;
		queue.push(idx);
	};

	// Pass 1: edge-connected flood fill (hard cut, soft=0)
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
		data[idx * 4 + 3] = 0;
		const x = idx % width;
		const y = (idx / width) | 0;
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

	// Pass 2: expand transparency into mid-gray islands touching transparent pixels
	// avg >= 145, chroma <= 40 — raise floor if stainless eaten
	const pass2Floor = 145;
	const pass2Chroma = 40;
	let grew = true;
	let pass2Count = 0;
	while (grew) {
		grew = false;
		const seeds = [];
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const idx = y * width + x;
				const i = idx * 4;
				if (data[i + 3] === 0) continue;
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				const avg = (r + g + b) / 3;
				const chroma = Math.max(r, g, b) - Math.min(r, g, b);
				if (avg < pass2Floor || chroma > pass2Chroma) continue;
				let touchesTransparent = false;
				for (let dy = -1; dy <= 1 && !touchesTransparent; dy++) {
					for (let dx = -1; dx <= 1 && !touchesTransparent; dx++) {
						if (!dx && !dy) continue;
						const nx = x + dx;
						const ny = y + dy;
						if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
						if (data[(ny * width + nx) * 4 + 3] === 0) touchesTransparent = true;
					}
				}
				if (touchesTransparent) seeds.push(idx);
			}
		}
		if (!seeds.length) break;
		const localVisited = new Uint8Array(n);
		const q = seeds.slice();
		for (const s of seeds) localVisited[s] = 1;
		while (q.length) {
			const idx = q.pop();
			const i = idx * 4;
			if (data[i + 3] === 0) continue;
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			const avg = (r + g + b) / 3;
			const chroma = Math.max(r, g, b) - Math.min(r, g, b);
			if (avg < pass2Floor || chroma > pass2Chroma) continue;
			data[i + 3] = 0;
			pass2Count++;
			grew = true;
			const x = idx % width;
			const y = (idx / width) | 0;
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					if (!dx && !dy) continue;
					const nx = x + dx;
					const ny = y + dy;
					if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
					const nidx = ny * width + nx;
					if (localVisited[nidx]) continue;
					localVisited[nidx] = 1;
					q.push(nidx);
				}
			}
		}
	}
	console.log(`pass2 cleared pixels: ${pass2Count}`);

	const cutPng = await sharp(data, { raw: { width, height, channels: 4 } })
		.png()
		.toBuffer();

	// Cover resize onto solid #dddddd
	const resized = await sharp(cutPng)
		.resize(CARD, CARD, { fit: 'cover', position: 'centre' })
		.ensureAlpha()
		.toBuffer();

	await sharp({
		create: {
			width: CARD,
			height: CARD,
			channels: 3,
			background: BG,
		},
	})
		.composite([{ input: resized, blend: 'over' }])
		.webp({ quality: 88, effort: 6 })
		.toFile(OUT);

	console.log(`wrote ${OUT}`);

	// Verification samples
	const { data: out, info: oi } = await sharp(OUT)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const W = oi.width;
	const H = oi.height;
	const sample = (x, y, label) => {
		const i = (y * W + x) * 4;
		const r = out[i];
		const g = out[i + 1];
		const b = out[i + 2];
		console.log(`${label} (${x},${y}): rgb(${r},${g},${b})`);
		return [r, g, b];
	};

	console.log('\n=== VERIFICATION ===');
	sample(2, 2, 'corner TL');
	sample(W - 3, 2, 'corner TR');
	sample(2, H - 3, 'corner BL');
	sample(W - 3, H - 3, 'corner BR');
	sample(4, (H / 2) | 0, 'mid-left');
	sample(100, 900, 'BL patch A');
	sample(150, 950, 'BL patch B');
	sample(180, 1000, 'BL patch C');
	sample(120, 1050, 'BL patch D');
	sample(200, 880, 'BL patch E');
	sample((W / 2) | 0, (H / 2) | 0, 'product center');
	sample(400, 700, 'body sample');
	sample(600, 500, 'upper body');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
