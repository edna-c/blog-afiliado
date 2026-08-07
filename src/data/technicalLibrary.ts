/**
 * Biblioteca Técnica — Motor III (Tipo B)
 *
 * Sistema editorial de ativos técnicos reutilizáveis (não coleção de imagens).
 * Arquitetura permanente estabelecida · ativos = 1ª geração · evolução incremental.
 *
 * Masters: `src/assets/images/library/LXXA.webp`
 * SSOT: `docs/BIBLIOTECA_VISUAL.md` · Backlog: `docs/BACKLOG_PATRIMONIO_VISUAL.md`
 *
 * Uso: `<TechnicalFigure id="L09A" />` — nunca hardcodar path por página.
 */

import type { ImageMetadata } from 'astro';
import type {
	GovernanceStatus,
	ReusePotential,
	VisualCategory,
	VisualLifespan,
} from './visualAssetRegistry';

import L05A from '../assets/images/library/L05A.webp';
import L06A from '../assets/images/library/L06A.webp';
import L06B from '../assets/images/library/L06B.webp';
import L07A from '../assets/images/library/L07A.webp';
import L09A from '../assets/images/library/L09A.webp';

export type TechnicalAssetId = 'L05A' | 'L06A' | 'L06B' | 'L07A' | 'L09A';

export interface TechnicalLibraryAsset {
	id: TechnicalAssetId;
	/** Arquivo canônico Astro (`src/assets/images/library/`) */
	image: ImageMetadata;
	/** URL pública espelho (markdown / OG) — só Incorporados */
	publicPath?: string;
	category: VisualCategory;
	tema: string;
	tipo: 'comparacao-tecnica' | 'tipologia';
	reusePotential: ReusePotential;
	lifespan: VisualLifespan;
	status: GovernanceStatus;
	/** Texto na arte (desvio — preferir HTML) */
	hasBakedText: boolean;
	defaultAlt: string;
	defaultTitle: string;
	defaultCaption: string;
	plannedFor: readonly string[];
	usedBy: readonly string[];
	notes?: string;
}

export const TECHNICAL_LIBRARY = {
	L06A: {
		id: 'L06A',
		image: L06A,
		publicPath: '/images/library/L06A.webp',
		category: 'tecnico',
		tema: 'Trempes: ferro fundido × aramada esmaltada',
		tipo: 'comparacao-tecnica',
		reusePotential: 'alto',
		lifespan: 'permanente',
		status: 'incorporado',
		hasBakedText: false,
		defaultAlt:
			'Comparação técnica entre trempe de ferro fundido à esquerda, robusta e fosca, e trempe aramada esmaltada à direita, fina e brilhante, sobre fundo escuro',
		defaultTitle: 'Ferro fundido × aramada esmaltada',
		defaultCaption:
			'Ferro fundido costuma transmitir mais massa e estabilidade; a aramada esmaltada é mais leve e tubular — compare o desenho, não só o anúncio.',
		plannedFor: [
			'/fogao-5-bocas-custo-beneficio/',
			'/fogao-4-bocas-custo-beneficio/',
			'/review-fogao-5-bocas-brastemp/',
			'/review-fogao-5-bocas-consul/',
			'/review-fogao-5-bocas-electrolux/',
			'/brastemp-bfs5ncr-vale-a-pena/',
			'/melhores/melhor-fogao-5-bocas/',
			'/melhores/melhor-fogao-4-bocas/',
			'/melhores/melhor-fogao-mesa-de-vidro/',
			'/blog/fogao-mesa-de-vidro-ou-inox/',
		],
		usedBy: [
			'/fogao-5-bocas-custo-beneficio/',
			'/brastemp-bfs5ncr-vale-a-pena/',
			'/review-fogao-5-bocas-brastemp/',
			'/review-fogao-5-bocas-consul/',
			'/review-fogao-5-bocas-electrolux/',
			'/review-fogao-4-bocas-consul/',
			'/review-fogao-4-bocas-electrolux/',
			'/review-fogao-mesa-de-vidro-consul/',
		],
		notes: 'Lacuna L06 · brief L06A. Sem texto na arte. ÂNCORA DNA · pedagogia visual.',
	},
	L09A: {
		id: 'L09A',
		image: L09A,
		publicPath: '/images/library/L09A.webp',
		category: 'tecnico',
		tema: 'Forno simples × forno duplo',
		tipo: 'comparacao-tecnica',
		reusePotential: 'alto',
		lifespan: 'permanente',
		status: 'incorporado',
		hasBakedText: true,
		defaultAlt:
			'Comparação técnica entre fogão de forno simples com uma cavidade e fogão de forno duplo com duas cavidades independentes, portas abertas sobre fundo escuro',
		defaultTitle: 'Forno simples × forno duplo',
		defaultCaption:
			'Comparação estrutural: uma cavidade maior no forno simples versus duas cavidades independentes no forno duplo — confirme no manual se o uso paralelo é permitido.',
		plannedFor: [
			'/blog/melhor-fogao-com-forno-duplo/',
			'/como-escolher-fogao-5-bocas/',
			'/como-escolher-fogao-4-bocas/',
			'/melhores/melhor-fogao-5-bocas/',
		],
		usedBy: ['/blog/melhor-fogao-com-forno-duplo/'],
		notes:
			'Lacuna L16. 1ª geração aprovada · EVOLUIR: remover texto/callouts; alinhar ao DNA L06A/L08A. Não regenerar do zero.',
	},
	L07A: {
		id: 'L07A',
		image: L07A,
		category: 'tecnico',
		tema: 'Queimadores: chama simples × dupla × tripla',
		tipo: 'tipologia',
		reusePotential: 'alto',
		lifespan: 'permanente',
		status: 'produzido',
		hasBakedText: true,
		defaultAlt:
			'Tipologia de queimadores a gás: chama simples, chama dupla e chama tripla com trempes de ferro fundido sobre fundo escuro',
		defaultTitle: 'Chama simples × dupla × tripla',
		defaultCaption:
			'Anéis de chama em progressão: simples, dupla e tripla — critério de potência e uso com panelas grandes.',
		plannedFor: ['cluster-tecnico', '/fogao-5-bocas-custo-beneficio/'],
		usedBy: [],
		notes:
			'Lacuna L07. 1ª geração · EVOLUIR: excelente conceito; perder texto na arte antes de Incorporar/wiring.',
	},
	L06B: {
		id: 'L06B',
		image: L06B,
		category: 'tecnico',
		tema: 'Trempes: contínua/dupla × individuais',
		tipo: 'comparacao-tecnica',
		reusePotential: 'medio',
		lifespan: 'permanente',
		status: 'produzido',
		hasBakedText: false,
		defaultAlt:
			'Comparação entre trempe contínua retangular para dois queimadores e quatro trempes individuais, ambas aramadas esmaltadas sobre fundo escuro',
		defaultTitle: 'Trempe contínua × individuais',
		defaultCaption:
			'Configuração de mesa: peça contínua (dois queimadores) versus trempes individuais — impacto em limpeza e estabilidade.',
		plannedFor: ['cluster-tecnico'],
		usedBy: [],
		notes: 'Complemento a L06A (configuração, não material). Validar escopo antes de wiring.',
	},
	L05A: {
		id: 'L05A',
		image: L05A,
		publicPath: '/images/library/L05A.webp',
		category: 'tecnico',
		tema: 'Mesa de vidro × mesa de inox',
		tipo: 'comparacao-tecnica',
		reusePotential: 'alto',
		lifespan: 'permanente',
		status: 'incorporado',
		hasBakedText: false,
		defaultAlt:
			'Comparação técnica entre fogão com mesa de vidro temperado preto à esquerda e fogão com mesa de inox escovado com rebaixos à direita, mesma configuração de bocas e trempes, fundo neutro',
		defaultTitle: 'Mesa de vidro × mesa de inox',
		defaultCaption:
			'Mesa de vidro: superfície lisa e contínua. Mesa de inox: superfície estampada com rebaixos — o material do tampo muda limpeza, visual e retenção de respingos.',
		plannedFor: [
			'/blog/fogao-mesa-de-vidro-ou-inox/',
			'/melhores/melhor-fogao-mesa-de-vidro/',
			'/review-fogao-mesa-de-vidro-consul/',
		],
		usedBy: ['/review-fogao-mesa-de-vidro-consul/'],
		notes:
			'Lacuna L05. v2: sem texto na arte; trempes iguais nos dois lados (eixo único = tampo). Fotografia editorial. Incorporado — âncora review CFO4VAR.',
	},
} as const satisfies Record<TechnicalAssetId, TechnicalLibraryAsset>;

export function getTechnicalAsset(id: TechnicalAssetId): TechnicalLibraryAsset {
	return TECHNICAL_LIBRARY[id];
}

/** Exports nomeados para `import { L09A } from '…/technicalLibrary'` */
export const L06A_ASSET = TECHNICAL_LIBRARY.L06A;
export const L09A_ASSET = TECHNICAL_LIBRARY.L09A;
export { L06A, L09A, L07A, L06B, L05A };
