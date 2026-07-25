# Affiliate Health Monitor

Módulo permanente para monitorar links de afiliados do Casa Prática Eletro.

## Arquitetura

```text
affiliate-monitor/
├── config/           # Política escalonada + prioridades (limites centralizados)
├── policy/           # Filtros de agenda (prioridade / frequency)
├── marketplaces/     # Registry de plugins (extensão de lojas)
├── collectors/       # Coleta HTTP + sinais por marketplace
├── validators/       # link → presença → estoque
├── reports/          # JSON / Markdown / HTML + manifest
├── types/            # Contrato público
├── utils/            # inventário, fetch, título, usage, health score
├── monitor.ts        # Motor
├── cli.ts            # Entrypoint CLI / automação
└── index.ts          # API pública
```

Fluxo: **inventário** (`products.ts` via plugins) → **filtro de agenda (opcional)** → **collector** → **validators** → **confirmação (2ª tentativa se necessário)** → **MonitorReport** → **reports**.

O motor **não** contém `if (marketplace === 'shopee')`. Toda lógica específica fica no plugin/collector.

## Estratégia de monitoramento escalonado

A frequência **não** é um cron fixo embutido. O módulo é idempotente e aceita disparo por GitHub Actions, Vercel Cron, cron do SO ou execução manual. A **política** descreve o que cada fase recomenda.

### Fase atual — catálogo pequeno (`small_catalog`)

Enquanto houver poucos artigos e poucas centenas de links:

- Varredura **completa** 1× por dia
- Janela sugerida: **04:00–06:00** (horário local do operador/cron)
- Gera histórico + `affiliate-health-latest.*` + Health Score
- Status `ERRO_ACESSO`, `LINK_INVALIDO`, `REMOVIDO` (e resultados inconclusivos mapeados a `ERRO_ACESSO`) **não** viram falha definitiva na 1ª tentativa
- Aguarda delay configurável (**10–30 min** por padrão) e faz **2ª tentativa**; só então confirma o status

```bash
# Produção / cron diário
npm run monitor:affiliates

# Local rápido (sem espera de confirmação)
npm run monitor:affiliates -- --no-confirm

# Local com confirmação curta (2–5s)
npm run monitor:affiliates -- --quick-confirm
```

### Fase intermediária (preparada, não automática)

Quando o projeto crescer (~300–700 artigos / centenas de produtos — ver `EVOLUTION_THRESHOLDS`):

Exemplo de cadência via cron externo + CLI (ainda não muda sozinho):

| Horário | Comando sugerido |
|---|---|
| 06:00 | `npm run monitor:affiliates` (completo) |
| 12:00 | `npm run monitor:affiliates -- --priority=HIGH` |
| 18:00 | `npm run monitor:affiliates -- --priority=HIGH --priority=MEDIUM` *(ajustar)* |

Limiares ficam em `config/monitoring-policy.ts` / env — **não** hardcoded no motor.

### Fase avançada (preparada, não automática)

Com centenas de artigos e milhares de links, usar `monitorPriority` + `monitorFrequency`:

| Prioridade | Exemplos | Frequência |
|---|---|---|
| HIGH | Home, destaques, comparativos, maior receita | a cada 6 h |
| MEDIUM | Reviews, guias, tráfego constante | 1×/dia |
| LOW | Conteúdo antigo / baixo tráfego | 1×/semana |

Como definir no futuro:

1. Editar `config/product-priorities.ts` (`PRODUCT_MONITOR_OVERRIDES`)
2. Ou evoluir o schema de dados sem tocar no motor
3. Ativar filtro de cadência: `--respect-frequency` + `lastCheckedByKey` (via job) / `AFFILIATE_MONITOR_RESPECT_FREQUENCY=true`

O inventário já anexa `monitorPriority` / `monitorFrequency` em cada target (default `MEDIUM` / `daily`).

### Quando aumentar a frequência

Use indicadores reais (centralizados em `EVOLUTION_THRESHOLDS` / env):

- quantidade de artigos publicados
- produtos / links monitorados
- tempo médio de execução (`meta.durationMs`)
- taxa de `ERRO_ACESSO`
- Health Score
- falsos positivos operacionais / consumo de recursos

**Não** há switch automático de fase no código nesta etapa — a evolução é operacional (ajustar cron + flags).

## Execução

```bash
npm run monitor:affiliates
npm run monitor:affiliates -- --product=brastempBFS5NCR
npm run monitor:affiliates -- --marketplace=mercadolivre
npm run monitor:affiliates -- --priority=HIGH
```

### Env (automação)

| Variável | Função |
|---|---|
| `AFFILIATE_MONITOR_OUT_DIR` | Pasta de relatórios |
| `AFFILIATE_MONITOR_DELAY_MS` | Delay entre links |
| `AFFILIATE_MONITOR_CONFIRMATION_ENABLED` | Liga/desliga 2ª tentativa |
| `AFFILIATE_MONITOR_CONFIRM_DELAY_MIN_MS` | Default 600000 (10 min) |
| `AFFILIATE_MONITOR_CONFIRM_DELAY_MAX_MS` | Default 1800000 (30 min) |
| `AFFILIATE_MONITOR_RESPECT_FREQUENCY` | Filtra por cadência (default off) |
| `AFFILIATE_MONITOR_PHASE_*` / `*_WARN*` | Limiares de evolução (ver config) |

Exit codes: `0` ok · `1` REMOVIDO/LINK_INVALIDO **confirmados** · `2` falha de runtime.

## Histórico

Cada execução grava:

- `reports/affiliate-health/affiliate-health-latest.{json,md,html}`
- `reports/affiliate-health/affiliate-health-manifest.json`
- `reports/affiliate-health/YYYY/MM/affiliate-health-YYYY-MM-DD.*` (último do dia)
- `reports/affiliate-health/YYYY/MM/affiliate-health-YYYY-MM-DD_HHmmss.*` (snapshot da run)

## Health Score

- Pesos: `REMOVIDO`/`LINK_INVALIDO` = 1 · `ERRO_ACESSO` = 0.55 · `SEM_ESTOQUE` = 0.35 · `OK` = 0
- Labels: Excelente (≥95) · Bom (≥85) · Atenção (≥70) · Crítico (<70)

## Como adicionar um novo marketplace

1. Criar `collectors/amazon.ts` implementando `MarketplaceCollector`.
2. Criar `marketplaces/amazon.ts` com `MarketplacePlugin`.
3. Registrar em `marketplaces/index.ts`.
4. Estender `ProdutoAfiliado` em `products.ts` + `extractLink`.

## Como adicionar uma nova validação

1. Sinal no collector (`PageSignals`) ou pipeline em `validators/resolve-status.ts`.
2. Teste em `affiliate-monitor.test.ts`.
3. Se o status for “falha suspeita”, decidir se entra em `CONFIRMATION_STATUSES`.

## Heurísticas (HTTP)

- Título: `og:title` → `twitter:title` → JSON-LD → `<title>`
- Anti-bot / intermediário / sem `productPresent` só com HTTP 200
- Playwright: **não** integrado; avaliar só com gatilho operacional (escala ou taxa de erro alta)

## API rápida

```ts
import { runAffiliateMonitor, writeMonitorReports } from './src/modules/affiliate-monitor/index.ts';

const report = await runAffiliateMonitor({ confirmationEnabled: true });
await writeMonitorReports(report, { outDir: 'reports/affiliate-health' });
```
