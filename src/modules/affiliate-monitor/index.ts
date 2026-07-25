/**
 * Affiliate Health Monitor — API pública do módulo.
 */

export type {
	AffiliateHealthStatus,
	CollectedPage,
	HealthScore,
	HealthScoreLabel,
	LinkValidation,
	MarketplaceId,
	MarketplaceSummary,
	MonitorFrequency,
	MonitoredProductResult,
	MonitorPriority,
	MonitorReport,
	MonitorRunOptions,
	MonitorTarget,
	PageSignals,
	ProductUsageLocations,
} from './types/index.ts';

export { AFFILIATE_HEALTH_STATUSES } from './types/index.ts';

export { runAffiliateMonitor, writeMonitorReports } from './monitor.ts';
export type { RunAffiliateMonitorResult, WriteReportsOptions } from './monitor.ts';

export { loadAffiliateInventory, PRODUCT_DISPLAY_NAMES } from './utils/inventory.ts';
export { buildArticleUsageMap, flattenUsage } from './utils/article-usage.ts';
export { buildMarketplaceSummaries, formatSummaryText } from './utils/summary.ts';
export { computeHealthScore, formatHealthScoreText, labelForScore } from './utils/health-score.ts';
export {
	MARKETPLACE_LABELS,
	detectMarketplaceFromUrl,
	marketplaceLabel,
} from './utils/marketplace.ts';

export {
	loadMonitoringPolicy,
	needsStatusConfirmation,
	pickConfirmationDelayMs,
	CONFIRMATION_STATUSES,
	PRIORITY_SCHEDULES,
	EVOLUTION_THRESHOLDS,
} from './config/monitoring-policy.ts';
export type { MonitoringPolicy, MonitoringPhaseId } from './config/monitoring-policy.ts';
export {
	PRODUCT_MONITOR_OVERRIDES,
	resolveProductMonitorMeta,
} from './config/product-priorities.ts';
export {
	filterTargetsBySchedule,
	targetScheduleKey,
	describePhaseSchedule,
} from './policy/schedule.ts';

export { validateAffiliateLink } from './validators/link-validator.ts';
export { validateProductPresence } from './validators/product-validator.ts';
export { validateStock } from './validators/stock-validator.ts';
export { resolveHealthStatus } from './validators/resolve-status.ts';

export {
	getCollector,
	listRegisteredMarketplaces,
	resolveCollectorForUrl,
	mercadoLivreCollector,
	shopeeCollector,
} from './collectors/index.ts';

export {
	listMarketplacePlugins,
	getMarketplacePlugin,
	requireMarketplacePlugin,
	mercadoLivrePlugin,
	shopeePlugin,
} from './marketplaces/index.ts';
export type { MarketplacePlugin, MarketplaceLinkRef } from './marketplaces/types.ts';

export { toJsonReport, toAutomationManifest } from './reports/json-report.ts';
export { toMarkdownReport } from './reports/markdown-report.ts';
export { toHtmlReport } from './reports/html-report.ts';
