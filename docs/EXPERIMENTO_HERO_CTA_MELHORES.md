# Experimento — CTA afiliado no Hero (Melhores)

**Status:** protocolo travado antes da medição · CRO congelado na janela  
**Log:** [`CRO-001` em `docs/CRO_EXPERIMENT_LOG.md`](./CRO_EXPERIMENT_LOG.md)  
**Escopo:** `/melhores/melhor-fogao-5-bocas/`, `/melhores/melhor-fogao-4-bocas/`, `/melhores/melhor-fogao-mesa-de-vidro/`

## Hipótese

Reduzir a distância entre a decisão do usuário e a primeira oportunidade de consultar o preço aumenta os cliques afiliados.

## Implementação sob teste

Um único CTA afiliado no box de ranking do Hero, consumindo o mesmo `featuredHeroProduct` dos cards (`getFeaturedCommercialProduct` + `getMercadoLivreCtaLabel` / SSOT em `commercialGuideBlocks`).

## Janela de observação

Cumprir **o que vier depois**:

| Critério | Valor |
|----------|--------|
| Tempo mínimo | **7 dias corridos** após deploy em produção |
| Volume mínimo | **≥ 300 sessões** somadas nas 3 URLs Melhores |

**Não** interpretar resultados no dia seguinte ao deploy.

**Baseline:** mesmos KPIs nos 7 dias imediatamente anteriores ao deploy (ou janela pré-deploy com o mesmo volume de sessões, se a regra de volume prevalecer).

## KPIs

| KPI | Fonte |
|-----|--------|
| Impressões | GSC (URLs Melhores) |
| Cliques orgânicos | GSC (URLs Melhores) |
| Sessões | Analytics (URLs Melhores) |
| Cliques afiliados | Painel ML + Shopee (atribuíveis a essas páginas, quando possível) |
| **CTR Afiliado** | **Cliques afiliados ÷ Sessões nas Melhores** |
| Conversões / vendas | Painéis afiliados (se ocorrerem) |

### Por que CTR Afiliado

Cliques afiliados sozinhos confundem-se com crescimento de tráfego. A CTR isola **eficiência da página**:

| | Antes | Depois | Leitura |
|--|-------|--------|---------|
| Sessões 300→600, cliques 15→24 | CTR 5%→4% | Mais tráfego, funil talvez pior |
| Sessões 300→300, cliques 15→24 | CTR 5%→8% | Evidência forte de ganho de eficiência |

## Critérios de decisão (fixidos antes dos números)

| Veredito | Definição |
|----------|-----------|
| **Sucesso** | Aumento significativo da **CTR Afiliado** e/ou dos cliques afiliados **sem depender apenas** de crescimento do tráfego orgânico (GSC/sessões). Referência orientativa: CTR Afiliado **≥ +25%** relativo ao baseline, ou cliques afiliados **≥ +25%** com sessões estáveis (±15%). |
| **Neutro** | Variação fraca / ambígua (ex.: CTR entre −10% e +25%) sem sinal claro. |
| **Fracasso da hipótese** | CTR Afiliado e cliques afiliados ≈ iguais ou piores apesar do vão decisão→CTA reduzido. Investigar confiança no ranking, SKUs, microcopy — não timing do CTA. |

Pergunta-guia: *a eficiência do clique afiliado nas Melhores melhorou depois da mudança?*

## Regra de não contaminação

Durante a janela de observação:

- **Não** realizar deploys que alterem o funil comercial das páginas analisadas.
- Inclui (não exaustivo): CTAs, cards, tabela comparativa, hero comercial, reviews ligadas ao funil, Home comercial que alimente esses hubs, microcopy de oferta, URLs afiliadas dos SKUs do ranking.
- Permitido: correções críticas de build/segurança/SEO técnico sem mudar o funil de conversão.

Se houver contaminação involuntária, **invalidar** a janela e reiniciar o baseline após o deploy contaminante.

## Sprint B — anotada, não executar

Só se o veredito for **Sucesso**, nesta ordem (fluxo do usuário):

1. Hero das demais money pages (mesmo padrão)  
2. Home (somente se alimentar esses hubs)  
3. Reviews  
4. Cards  

## Registro do experimento

| Campo | Valor |
|-------|--------|
| Data do deploy | _preencher_ |
| Início da janela pós | _preencher_ |
| Fim da janela (7d ou 300 sessões) | _preencher_ |
| Baseline — sessões / cliques afiliados / CTR | _preencher_ |
| Pós — sessões / cliques afiliados / CTR | _preencher_ |
| Veredito | Sucesso · Neutro · Fracasso |
| Decisão Sprint B | Sim · Não · Adiar |
