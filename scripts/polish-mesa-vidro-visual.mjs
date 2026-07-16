/**
 * Lapidação visual — Melhor Fogão Mesa de Vidro
 * Regenera cards (+~12% presença) e heroes de justificativa em canvas 16:10 uniforme.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'public/images/melhores/melhor-fogao-mesa-de-vidro/_src';
const OUT = 'public/images/melhores/melhor-fogao-mesa-de-vidro';
const HERO_ASSETS = 'src/assets/images/heroes';

const CARD_SIZE = 1254;
/** Antes 0.9 → ~9% no asset; complementado com imageVisualScale 1.04 nos cards (~13% total). */
const CARD_PRODUCT_SCALE = 0.98;

const JUST_W = 1600;
const JUST_H = 1000;
/** Altura visual alvo do produto no frame 16:10 (catálogo único). */
const JUST_TARGET_H = Math.round(JUST_H * 0.78);

function darkBackdropSvg(w, h) {
	return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
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

	return sharp(data, { raw: { width, height, channels: 4 } }).png();
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

async function extractProduct(input, mode, bgOpts) {
	let product =
		mode === 'white' || mode === 'gray'
			? await removeEdgeConnectedBackground(
					input,
					mode === 'gray'
						? { threshold: 168, chromaMax: 45, soft: 14, ...bgOpts }
						: bgOpts,
				)
			: await punchNearBlack(input);
	product = await product.trim({ threshold: mode === 'gray' ? 8 : 5 });
	return product.png().toBuffer();
}

async function treatCard({ input, mode, outName, brightness = 1, bgOpts }) {
	let pBuf = await extractProduct(input, mode, bgOpts);
	if (brightness !== 1) {
		pBuf = await sharp(pBuf).modulate({ brightness }).png().toBuffer();
	}
	const pMeta = await sharp(pBuf).metadata();
	const maxSide = Math.min(CARD_SIZE - 4, Math.round(CARD_SIZE * CARD_PRODUCT_SCALE));
	const resized = await sharp(pBuf)
		.resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: false })
		.png()
		.toBuffer();
	const rMeta = await sharp(resized).metadata();
	const left = Math.round((CARD_SIZE - rMeta.width) / 2);
	const top = Math.round((CARD_SIZE - rMeta.height) / 2 + CARD_SIZE * 0.01);

	const shadowW = Math.round(rMeta.width * 0.72);
	const shadowH = Math.round(Math.max(18, rMeta.height * 0.06));
	const shadowSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${shadowW}" height="${shadowH}">
    <ellipse cx="50%" cy="50%" rx="48%" ry="40%" fill="black" opacity="0.45"/>
  </svg>`);
	const shadow = await sharp(shadowSvg).blur(8).png().toBuffer();
	const shadowLeft = Math.round(left + (rMeta.width - shadowW) / 2);
	const shadowTop = Math.round(top + rMeta.height - shadowH * 0.35);
	const backdrop = await sharp(darkBackdropSvg(CARD_SIZE, CARD_SIZE)).png().toBuffer();

	await sharp(backdrop)
		.composite([
			{ input: shadow, left: shadowLeft, top: shadowTop },
			{ input: resized, left, top },
		])
		.webp({ quality: 86, effort: 6 })
		.toFile(path.join(OUT, outName));
	console.log(
		`card ${outName}: ${rMeta.width}x${rMeta.height} (src ${pMeta.width}x${pMeta.height})`,
	);
}

/**
 * Justificativa 16:10 — mesma altura aparente + mesmo fundo + brilho equilibrado.
 */
async function treatJustificativa({ input, mode, outName, brightness = 1, bgOpts }) {
	let pBuf = await extractProduct(input, mode, bgOpts);
	if (brightness !== 1) {
		pBuf = await sharp(pBuf).modulate({ brightness }).png().toBuffer();
	}
	const resized = await sharp(pBuf)
		.resize({ height: JUST_TARGET_H, fit: 'inside', withoutEnlargement: false })
		.png()
		.toBuffer();
	const rMeta = await sharp(resized).metadata();
	const left = Math.round((JUST_W - rMeta.width) / 2);
	const top = Math.round((JUST_H - rMeta.height) / 2);

	const shadowW = Math.round(rMeta.width * 0.72);
	const shadowH = Math.round(Math.max(18, rMeta.height * 0.055));
	const shadowSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${shadowW}" height="${shadowH}">
    <ellipse cx="50%" cy="50%" rx="48%" ry="40%" fill="black" opacity="0.42"/>
  </svg>`);
	const shadow = await sharp(shadowSvg).blur(8).png().toBuffer();
	const shadowLeft = Math.round(left + (rMeta.width - shadowW) / 2);
	const shadowTop = Math.round(top + rMeta.height - shadowH * 0.35);
	const backdrop = await sharp(darkBackdropSvg(JUST_W, JUST_H)).png().toBuffer();

	await sharp(backdrop)
		.composite([
			{ input: shadow, left: shadowLeft, top: shadowTop },
			{ input: resized, left, top },
		])
		.webp({ quality: 86, effort: 6 })
		.toFile(path.join(OUT, outName));
	console.log(`justificativa ${outName}: ${JUST_W}x${JUST_H}, product h=${rMeta.height}`);
}

async function treatCardCover({ input, outName }) {
	await sharp(input)
		.resize(CARD_SIZE, CARD_SIZE, { fit: 'cover', position: 'centre' })
		.webp({ quality: 88, effort: 6 })
		.toFile(path.join(OUT, outName));
	console.log(`card cover ${outName}: ${CARD_SIZE}x${CARD_SIZE}`);
}

fs.mkdirSync(OUT, { recursive: true });

const models = [
	{
		/** Cards afiliados: cover fundo original. Justificativas: DNA escuro (masters anteriores). */
		input: path.join(SRC, 'consul-cfo4var-card-user.png'),
		justInput: path.join(SRC, 'consul-3q.jpg'),
		mode: 'cover',
		justMode: 'white',
		card: 'consul-cfo4var.webp',
		just: 'consul-cfo4var-hero.webp',
		justBrightness: 1.02,
	},
	{
		input: path.join(SRC, 'brastemp-bfo4vae-card-user.png'),
		justInput: path.join(SRC, 'brastemp-laser-2.png'),
		mode: 'cover',
		justMode: 'white',
		card: 'brastemp-bfo4vae.webp',
		just: 'brastemp-bfo4vae-hero.webp',
		justBrightness: 1.06,
	},
	{
		input: path.join(SRC, 'atlas-atenas-glass-card-user.png'),
		justInput: path.join(SRC, 'atlas-official.png'),
		mode: 'cover',
		justMode: 'black',
		card: 'atlas-atenas-glass.webp',
		just: 'atlas-atenas-glass-hero.webp',
		justBrightness: 1.08,
	},
];

for (const m of models) {
	if (m.mode === 'cover') {
		await treatCardCover({ input: m.input, outName: m.card });
	} else {
		await treatCard({
			input: m.input,
			mode: m.mode,
			outName: m.card,
			brightness: m.brightness,
			bgOpts: m.bgOpts,
		});
	}
	await treatJustificativa({
		input: m.justInput ?? m.input,
		mode: m.justMode ?? m.mode,
		outName: m.just,
		brightness: m.justBrightness ?? m.brightness,
		bgOpts: m.justMode === 'white' ? undefined : m.bgOpts,
	});
}

/** Page hero: enquadramento fotográfico preservado (presença +5% via CSS na página). */
const ambient = path.join(SRC, 'consul-ambientada.jpg');
if (fs.existsSync(ambient)) {
	const heroOut = path.join(OUT, 'melhor-fogao-mesa-de-vidro-2026.webp');
	const heroAsset = path.join(HERO_ASSETS, 'melhor-fogao-mesa-de-vidro-2026.webp');
	await sharp(ambient)
		.resize({ width: 1600, height: 1000, fit: 'cover', position: 'centre' })
		.webp({ quality: 84, effort: 6 })
		.toFile(heroOut);
	fs.mkdirSync(HERO_ASSETS, { recursive: true });
	fs.copyFileSync(heroOut, heroAsset);
	console.log(`page hero (asset base): ${heroOut}`);
}

console.log('done');
