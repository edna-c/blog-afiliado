import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(
	__dirname,
	'..',
	'public/images/melhores/melhor-fogao-mesa-de-vidro/_src',
);
fs.mkdirSync(SRC, { recursive: true });

const files = [
	[
		'consul-3q.jpg',
		'https://consul.vtexassets.com/arquivos/ids/271404/02_Consul_Fogao_CFO4VAR_Imagem_3_4_Carrossel_3_4.jpg?v=638998537959530000',
	],
	[
		'consul-packshot.jpg',
		'https://consul.vtexassets.com/arquivos/ids/271414/11_Consul_Fogao_CFO4VAR_Imagem_Packshot_1.jpg?v=638998537961470000',
	],
	[
		'consul-ambientada.jpg',
		'https://consul.vtexassets.com/arquivos/ids/271411/08_Consul_Fogao_CFO4VAR_Imagem_Ambientada_1.jpg?v=638998537960830000',
	],
	[
		'brastemp-laser-1.png',
		'https://lasereletro.vteximg.com.br/arquivos/ids/908372-1000-1000/27145-1.png?v=639179817913470000',
	],
	[
		'brastemp-laser-2.png',
		'https://lasereletro.vteximg.com.br/arquivos/ids/908373-1000-1000/27145-2.png?v=639179817917500000',
	],
	[
		'brastemp-laser-3.png',
		'https://lasereletro.vteximg.com.br/arquivos/ids/908374-1000-1000/27145-3.png?v=639179817921330000',
	],
	[
		'brastemp-produzida.jpg',
		'https://brastemp.vtexassets.com/arquivos/ids/264174/01_Brastemp_Fogao_BFO4VAE_Imagem_Produzida.jpg?v=638974447970630000',
	],
	[
		'atlas-official.png',
		'https://atlaseletro.vtexassets.com/arquivos/ids/156427/4Q-ATENAS-GLASS---PRETO---2--1-.png?v=639078113602070000',
	],
];

const ua =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

for (const [name, url] of files) {
	const res = await fetch(url, { headers: { 'User-Agent': ua }, redirect: 'follow' });
	const buf = Buffer.from(await res.arrayBuffer());
	fs.writeFileSync(path.join(SRC, name), buf);
	console.log(`${name}: ${res.status} ${buf.length}b`);
}
