import type { AffiliateHealthStatus, MonitorReport, ProductUsageLocations } from '../types/index.ts';
import { formatHealthScoreText } from '../utils/health-score.ts';
import { formatSummaryText } from '../utils/summary.ts';

const STATUS_CLASS: Record<AffiliateHealthStatus, string> = {
	OK: 'ok',
	SEM_ESTOQUE: 'warn',
	REMOVIDO: 'bad',
	LINK_INVALIDO: 'bad',
	ERRO_ACESSO: 'err',
};

const STATUS_LABEL: Record<AffiliateHealthStatus, string> = {
	OK: 'OK',
	SEM_ESTOQUE: 'Sem estoque',
	REMOVIDO: 'Removido',
	LINK_INVALIDO: 'Link inválido',
	ERRO_ACESSO: 'Erro de acesso',
};

const STATUS_ORDER: Record<AffiliateHealthStatus, number> = {
	REMOVIDO: 0,
	LINK_INVALIDO: 1,
	ERRO_ACESSO: 2,
	SEM_ESTOQUE: 3,
	OK: 4,
};

export function toHtmlReport(report: MonitorReport): string {
	const summaryPre = escapeHtml(formatSummaryText(report.summaries));
	const healthText = escapeHtml(formatHealthScoreText(report.health));

	const sorted = [...report.results].sort(
		(a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
	);

	const rows = sorted
		.map((item) => {
			const usage = formatUsageHtml(item.articlesUsingProduct);
			return `<tr class="${STATUS_CLASS[item.status]}" data-status="${item.status}" data-marketplace="${escapeAttr(item.marketplace)}">
  <td>${escapeHtml(item.marketplace)}</td>
  <td><code>${escapeHtml(item.productId)}</code></td>
  <td>${escapeHtml(item.productName)}</td>
  <td><span class="badge">${STATUS_LABEL[item.status]}</span></td>
  <td>${item.httpStatus ?? '—'}</td>
  <td>${item.responseTimeMs ?? '—'}</td>
  <td>${item.redirectCount}</td>
  <td>${escapeHtml(item.collector)}</td>
  <td>${escapeHtml(item.title ?? '—')}</td>
  <td class="detail">${escapeHtml(item.detail ?? '—')}</td>
  <td class="url"><a href="${escapeAttr(item.finalUrl ?? item.url)}" rel="noopener noreferrer">${escapeHtml(item.finalUrl ?? item.url)}</a></td>
  <td class="usage">${usage}</td>
</tr>`;
		})
		.join('\n');

	return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Affiliate Health Monitor</title>
  <style>
    :root { color-scheme: light; font-family: ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; padding: 1.5rem; background: #f6f7f9; color: #1a1a1a; }
    h1 { margin: 0 0 .25rem; font-size: 1.5rem; }
    .meta { color: #555; margin-bottom: .75rem; }
    .health { display: inline-block; margin: .5rem 0 1rem; padding: .4rem .75rem; border-radius: 6px; background: #111; color: #e8e8e8; font-weight: 600; }
    .health.Excelente { background: #166534; }
    .health.Bom { background: #1e40af; }
    .health.Atenção { background: #92400e; }
    .health.Crítico { background: #991b1b; }
    pre.summary { background: #111; color: #e8e8e8; padding: 1rem 1.25rem; border-radius: 8px; overflow: auto; }
    .toolbar { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; margin: 1rem 0; }
    .toolbar label { font-size: .85rem; color: #444; }
    .toolbar select { padding: .35rem .5rem; border-radius: 6px; border: 1px solid #ccc; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 2px rgb(0 0 0 / 6%); }
    th, td { text-align: left; padding: .55rem .65rem; border-bottom: 1px solid #ececec; vertical-align: top; font-size: .82rem; }
    th { background: #f0f1f3; font-weight: 600; position: sticky; top: 0; }
    td.url, td.detail { max-width: 16rem; word-break: break-all; }
    td.usage { max-width: 14rem; font-size: .75rem; color: #444; }
    .badge { display: inline-block; padding: .15rem .45rem; border-radius: 4px; background: #e8e8e8; font-weight: 600; font-size: .75rem; }
    tr.ok .badge { background: #dcfce7; color: #166534; }
    tr.warn .badge { background: #fef3c7; color: #92400e; }
    tr.bad .badge { background: #fee2e2; color: #991b1b; }
    tr.err .badge { background: #e5e7eb; color: #374151; }
    tr.is-hidden { display: none; }
    code { font-size: .78rem; }
    .usage strong { display: inline-block; min-width: 4.5rem; color: #111; }
  </style>
</head>
<body>
  <h1>Affiliate Health Monitor</h1>
  <p class="meta">Gerado em ${escapeHtml(report.generatedAt)} · duração ${report.meta.durationMs}ms · ${report.meta.targetCount} checks</p>
  <div class="health ${escapeAttr(report.health.label)}">${healthText}</div>
  <h2>Resumo</h2>
  <pre class="summary">${summaryPre}</pre>
  <div class="toolbar">
    <label>Status
      <select id="filter-status">
        <option value="ALL">Todos</option>
        <option value="REMOVIDO">Removido</option>
        <option value="LINK_INVALIDO">Link inválido</option>
        <option value="ERRO_ACESSO">Erro de acesso</option>
        <option value="SEM_ESTOQUE">Sem estoque</option>
        <option value="OK">OK</option>
      </select>
    </label>
    <label>Marketplace
      <select id="filter-marketplace">
        <option value="ALL">Todos</option>
        ${[...new Set(report.results.map((r) => r.marketplace))]
					.map((m) => `<option value="${escapeAttr(m)}">${escapeHtml(m)}</option>`)
					.join('')}
      </select>
    </label>
    <span class="meta" id="visible-count"></span>
  </div>
  <h2>Detalhes <small>(ordenados por severidade)</small></h2>
  <table>
    <thead>
      <tr>
        <th>Marketplace</th>
        <th>productId</th>
        <th>Produto</th>
        <th>Status</th>
        <th>HTTP</th>
        <th>ms</th>
        <th>Redirects</th>
        <th>Collector</th>
        <th>Título</th>
        <th>Detail</th>
        <th>URL final</th>
        <th>Uso</th>
      </tr>
    </thead>
    <tbody id="results-body">
${rows}
    </tbody>
  </table>
  <script>
    (function () {
      var statusEl = document.getElementById('filter-status');
      var marketEl = document.getElementById('filter-marketplace');
      var countEl = document.getElementById('visible-count');
      var rows = Array.prototype.slice.call(document.querySelectorAll('#results-body tr'));
      function apply() {
        var st = statusEl.value;
        var mk = marketEl.value;
        var visible = 0;
        rows.forEach(function (row) {
          var okStatus = st === 'ALL' || row.getAttribute('data-status') === st;
          var okMarket = mk === 'ALL' || row.getAttribute('data-marketplace') === mk;
          var show = okStatus && okMarket;
          row.classList.toggle('is-hidden', !show);
          if (show) visible++;
        });
        countEl.textContent = visible + ' de ' + rows.length + ' linhas';
      }
      statusEl.addEventListener('change', apply);
      marketEl.addEventListener('change', apply);
      apply();
    })();
  </script>
</body>
</html>`;
}

function formatUsageHtml(usage: ProductUsageLocations): string {
	const parts: string[] = [];
	if (usage.articles.length) {
		parts.push(`<div><strong>articles</strong> ${escapeHtml(usage.articles.join(', '))}</div>`);
	}
	if (usage.components.length) {
		parts.push(
			`<div><strong>components</strong> ${escapeHtml(usage.components.join(', '))}</div>`,
		);
	}
	if (usage.dataFiles.length) {
		parts.push(`<div><strong>dataFiles</strong> ${escapeHtml(usage.dataFiles.join(', '))}</div>`);
	}
	return parts.join('') || '—';
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function escapeAttr(value: string): string {
	return escapeHtml(value).replace(/'/g, '&#39;');
}
