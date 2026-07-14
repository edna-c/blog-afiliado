import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Uniformiza o fundo esfumado sem recortar o produto:
 * puxa pixels cinza (baixo chroma) nas bordas para #151515
 * (cor do .product-media-frame), preservando o halo central.
 */
const OUT = 'public/images/melhores/melhor-fogao-4-bocas';
const FRAME = 0x15; // #151515
const RIM = 0.2; // 20% da moldura recebe correção progressiva
const MAX_CHROMA = 26;

function chroma(r, g, b) {
	return Math.max(r, g, b) - Math.min(r, g, b);
}

async function blendEdges(name) {
	const src = path.join(OUT, name);
	const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const { width: w, height: h } = info;
	const rimPx = Math.max(1, Math.round(Math.min(w, h) * RIM));

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const edgeDist = Math.min(x, y, w - 1 - x, h - 1 - y);
			if (edgeDist >= rimPx) continue;
			const i = (y * w + x) * 4;
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			if (chroma(r, g, b) > MAX_CHROMA) continue;

			const t = Math.pow(1 - edgeDist / rimPx, 1.55);
			data[i] = Math.round(r + (FRAME - r) * t);
			data[i + 1] = Math.round(g + (FRAME - g) * t);
			data[i + 2] = Math.round(b + (FRAME - b) * t);
		}
	}

	const outBuf = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
		.webp({ quality: 86, effort: 6 })
		.toBuffer();

	const staged = path.join(OUT, name.replace('.webp', '.blend.webp'));
	fs.writeFileSync(staged, outBuf);

	const sample = (x, y) => {
		const i = (y * w + x) * 4;
		return [data[i], data[i + 1], data[i + 2]].join(',');
	};
	console.log(
		`${name}: corner ${sample(0, 0)} mid-edge ${sample((w / 2) | 0, 0)} → ${outBuf.length} bytes`,
	);
}

const files = ['consul-cf04nar.webp', 'electrolux-fe4iw.webp', 'atlas-monaco-plus.webp'];
for (const f of files) await blendEdges(f);
