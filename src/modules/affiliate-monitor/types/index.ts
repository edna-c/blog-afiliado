/**
 * Tipos públicos do Affiliate Health Monitor.
 * Independentes de Astro/UI — prontos para dashboard, histórico e CI.
 */

/** ID de marketplace registrado no registry (extensível). */
export type MarketplaceId = string;

export type AffiliateHealthStatus =
	| 'OK'
	| 'SEM_ESTOQUE'
	| 'REMOVIDO'
	| 'LINK_INVALIDO'
	| 'ERRO_ACESSO';

export const AFFILIATE_HEALTH_STATUSES: readonly AffiliateHealthStatus[] = [
	'OK',
	'SEM_ESTOQUE',
	'REMOVIDO',
	'LINK_INVALIDO',
	'ERRO_ACESSO',
] as const;

/** Prioridade de monitoramento (fase avançada — opcional hoje). */
export type MonitorPriority = 'HIGH' | 'MEDIUM' | 'LOW';

/** Frequência sugerida de recheck (fase avançada — opcional hoje). */
export type MonitorFrequency = 'every_6h' | 'daily' | 'weekly';

export type HealthScoreLabel = 'Excelente' | 'Bom' | 'Atenção' | 'Crítico';

export type HealthScore = {
	/** 0–100 */
	score: number;
	label: HealthScoreLabel;
	total: number;
	ok: number;
	weightedIssues: number;
};

export type ProductUsageLocations = {
	articles: string[];
	components: string[];
	dataFiles: string[];
};

export type MonitorTarget = {
	productId: string;
	productName: string;
	marketplace: MarketplaceId;
	url: string;
	/** Metadado do painel de afiliados (quando existir no registro). */
	generatedByPanel?: boolean;
	/** Preparado para monitoramento escalonado (default MEDIUM se omitido). */
	monitorPriority?: MonitorPriority;
	/** Preparado para cadência por prioridade (default deriva da priority). */
	monitorFrequency?: MonitorFrequency;
};

export type PageSignals = {
	/** Página indica que o anúncio/produto foi removido ou não existe. */
	removed: boolean;
	/** Página indica indisponibilidade / sem estoque. */
	outOfStock: boolean;
	/** Há indícios de página de produto válida. */
	productPresent: boolean;
	/** Bloqueio anti-bot / challenge / captcha. */
	blocked: boolean;
	/** Landing intermediária (tracking, login, soft-404 genérica). */
	intermediate: boolean;
};

export type CollectedPage = {
	marketplace: MarketplaceId;
	url: string;
	finalUrl: string | null;
	httpStatus: number | null;
	fetched: boolean;
	title: string | null;
	html: string | null;
	error: string | null;
	signals: PageSignals;
	responseTimeMs: number | null;
	redirectCount: number;
	collector: MarketplaceId;
};

export type MonitoredProductResult = {
	marketplace: MarketplaceId;
	productId: string;
	productName: string;
	url: string;
	finalUrl: string | null;
	status: AffiliateHealthStatus;
	httpStatus: number | null;
	checkedAt: string;
	title: string | null;
	/** Onde o produto aparece no projeto, separado por tipo de arquivo. */
	articlesUsingProduct: ProductUsageLocations;
	/** Detalhe opcional para diagnóstico. */
	detail?: string;
	responseTimeMs: number | null;
	redirectCount: number;
	collector: MarketplaceId;
	monitorPriority?: MonitorPriority;
	monitorFrequency?: MonitorFrequency;
	/** Tentativas até status final (1 = sem confirmação; 2 = confirmado após retry). */
	confirmationAttempts: number;
	/** true quando o status foi aceito como definitivo nesta run. */
	statusConfirmed: boolean;
	/** Status da primeira tentativa, se houve confirmação. */
	previousStatus?: AffiliateHealthStatus;
};

export type MarketplaceSummary = {
	marketplace: MarketplaceId;
	label: string;
	total: number;
	byStatus: Record<AffiliateHealthStatus, number>;
};

export type MonitorReport = {
	generatedAt: string;
	results: MonitoredProductResult[];
	summaries: MarketplaceSummary[];
	health: HealthScore;
	/** Metadados para automação (CI/cron/dashboard). */
	meta: {
		version: 1;
		idempotent: true;
		targetCount: number;
		durationMs: number;
		policyPhase: string;
		confirmationEnabled: boolean;
		confirmationsRun: number;
	};
};

export type MonitorRunOptions = {
	/** Delay entre requisições (ms). Default: 700. */
	delayMs?: number;
	/** Timeout por requisição (ms). Default: 30000. */
	timeoutMs?: number;
	/** Filtrar por marketplace. */
	marketplaces?: MarketplaceId[];
	/** Filtrar por productId (chaves de `produtos`). */
	productIds?: string[];
	/** Filtrar por prioridade (preparado para runs parciais). */
	priorities?: MonitorPriority[];
	/** Sobrescreve policy.respectFrequency nesta run. */
	respectFrequency?: boolean;
	/** Últimos checks para filtro de cadência (chave productId::marketplace). */
	lastCheckedByKey?: Record<string, string>;
	/** Desliga confirmação em 2 etapas nesta run. */
	confirmationEnabled?: boolean;
	/** Delay mínimo da confirmação (ms) — útil em testes/local. */
	confirmDelayMinMs?: number;
	/** Delay máximo da confirmação (ms). */
	confirmDelayMaxMs?: number;
	/** Callback de progresso (opcional). */
	onProgress?: (done: number, total: number, current: MonitorTarget) => void;
};

export type LinkValidation = {
	ok: boolean;
	marketplace: MarketplaceId | null;
	reason?: string;
};
