import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'public/images/melhores/melhor-fogao-mesa-de-vidro/_src';
const OUT = 'public/images/melhores/melhor-fogao-mesa-de-vidro';
const HERO_ASSETS = 'src/assets/images/heroes';
const SIZE = 1254;
const PRODUCT_SCALE = 0.9;

function darkBackdropSvg(size) {
	return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs>
    <radialGradient id="g" cx="50%" cy="42%" r="64%">
      <stop offset="0%" stop-color="#2c2c30"/>
      <stop offset="50%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#151515"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);
}

function isBgCandidate(r, g, b, threshold, chromaMax) {
	const avg = (r + g + b) / 3;
	const chroma = Math.max(r, g, b) - Math.min(r, g, b);
	return avg >= threshold && chroma <= chromaMax;
}

async function removeEdgeConnectedBackground(
	inputPath,
	{ threshold = 245, chromaMax = 18, soft = 8 } = {},
) {
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
		if (!isBgCandidate(data[i], data[i + 1], data[i + 2], threshold, chromaMax)) return;
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
		const i = idx * 4;
		data[i + 3] = 0;
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

	if (soft > 0) {
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const idx = y * width + x;
				const i = idx * 4;
				if (data[i + 3] === 0) continue;
				if (!isBgCandidate(data[i], data[i + 1], data[i + 2], threshold - soft, chromaMax + 10)) {
					continue;
				}
				let near = false;
				for (let dy = -2; dy <= 2 && !near; dy++) {
					for (let dx = -2; dx <= 2 && !near; dx++) {
						const nx = x + dx;
						const ny = y + dy;
						if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
						if (data[(ny * width + nx) * 4 + 3] === 0) near = true;
					}
				}
				if (near) {
					const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
					const t = Math.max(0, Math.min(1, (threshold - avg) / soft));
					data[i + 3] = Math.round(255 * t);
				}
			}
		}
	}

	return sharp(data, {
		raw: { width, height, channels: 4 },
	}).png();
}

async function punchNearBlack(inputPath) {
	const { data, info } = await sharp(inputPath)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	for (let i = 0; i < data.length; i += 4) {
		const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
		if (avg < 12) data[i + 3] = 0;
	}
	return sharp(data, {
		raw: { width: info.width, height: info.height, channels: 4 },
	}).png();
}

async function treat({ input, mode, outName, scale = PRODUCT_SCALE }) {
	let product =
		mode === 'white'
			? await removeEdgeConnectedBackground(input)
			: await punchNearBlack(input);
	product = await product.trim({ threshold: 5 });

	const pBuf = await product.png().toBuffer();
	const pMeta = await sharp(pBuf).metadata();

	const maxSide = Math.round(SIZE * scale);
	const resized = await sharp(pBuf)
		.resize({
			width: maxSide,
			height: maxSide,
			fit: 'inside',
			withoutEnlargement: false,
		})
		.png()
		.toBuffer();
	const rMeta = await sharp(resized).metadata();

	const left = Math.round((SIZE - rMeta.width) / 2);
	const top = Math.round((SIZE - rMeta.height) / 2 + SIZE * 0.01);

	const shadowW = Math.round(rMeta.width * 0.72);
	const shadowH = Math.round(Math.max(18, rMeta.height * 0.06));
	const shadowSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${shadowW}" height="${shadowH}">
    <ellipse cx="50%" cy="50%" rx="48%" ry="40%" fill="black" opacity="0.45"/>
  </svg>`);
	const shadow = await sharp(shadowSvg).blur(8).png().toBuffer();
	const shadowLeft = Math.round(left + (rMeta.width - shadowW) / 2);
	const shadowTop = Math.round(top + rMeta.height - shadowH * 0.35);

	const backdrop = await sharp(darkBackdropSvg(SIZE)).png().toBuffer();

	await sharp(backdrop)
		.composite([
			{ input: shadow, left: shadowLeft, top: shadowTop },
			{ input: resized, left, top },
		])
		.webp({ quality: 86, effort: 6 })
		.toFile(path.join(OUT, outName));

	const st = fs.statSync(path.join(OUT, outName));
	console.log(
		`${outName}: ${SIZE}x${SIZE}, ${st.size} bytes (product ${pMeta.width}x${pMeta.height} → ${rMeta.width}x${rMeta.height})`,
	);
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(HERO_ASSETS, { recursive: true });

await treat({
	input: path.join(SRC, 'consul-3q.jpg'),
	mode: 'white',
	outName: 'consul-cfo4var.webp',
});
await treat({
	input: path.join(SRC, 'brastemp-laser-2.png'),
	mode: 'white',
	outName: 'brastemp-bfo4vae.webp',
});
await treat({
	input: path.join(SRC, 'atlas-official.png'),
	mode: 'black',
	outName: 'atlas-atenas-glass.webp',
});

for (const [src, dest] of [
	['consul-cfo4var.webp', 'consul-cfo4var-hero.webp'],
	['brastemp-bfo4vae.webp', 'brastemp-bfo4vae-hero.webp'],
	['atlas-atenas-glass.webp', 'atlas-atenas-glass-hero.webp'],
]) {
	fs.copyFileSync(path.join(OUT, src), path.join(OUT, dest));
	console.log(`copied ${dest}`);
}

/** Hero editorial da página — ambientada oficial Consul (cena de cozinha). */
const ambient = path.join(SRC, 'consul-ambientada.jpg');
if (fs.existsSync(ambient)) {
	const heroOut = path.join(OUT, 'melhor-fogao-mesa-de-vidro-2026.webp');
	const heroAsset = path.join(HERO_ASSETS, 'melhor-fogao-mesa-de-vidro-2026.webp');
	await sharp(ambient)
		.resize({ width: 1600, height: 1000, fit: 'cover', position: 'centre' })
		.webp({ quality: 84, effort: 6 })
		.toFile(heroOut);
	fs.copyFileSync(heroOut, heroAsset);
	console.log(`hero page: ${heroOut}`);
}
