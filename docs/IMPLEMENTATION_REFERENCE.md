# Referência Permanente de Implementação
## Casa Prática Eletro

**Status:** Documentação permanente — páginas modelo oficiais  
**Caminho canônico:** `docs/IMPLEMENTATION_REFERENCE.md`

Este documento registra **quais páginas existentes são referência permanente** para novas implementações (reviews, guias e comparativos).

Não substitui:

- `MANUAL_EDITORIAL.md` — identidade e tom
- `MANUAL_PAGINA_DECISAO.md` — fluxo de Página de Decisão / hub comercial
- `EDITORIAL_IMPLEMENTATION_RULES.md` — processo de verificação e build
- `PADROES_DE_COMPONENTES.md` — catálogo de componentes
- `workflow-pages.md` — checklist operacional de páginas

Complementa esses manuais com **exemplos concretos no código** — o “olhe esta página”.

Quando uma página deixar de ser modelo oficial ou uma nova referência for elevada, **atualize este arquivo** (nunca crie “versão 2”).

---

## Como usar

1. Identifique o **tipo** da página a implementar (review curta, review longa, guia, comparativo).
2. Abra a **referência** correspondente neste documento.
3. Replique arquitetura, componentes e padrão editorial — não invente layout paralelo.
4. Adapte só copy, SKU, dados de afiliado e links do cluster.

**Proibido:** alterar arquitetura global, Header/Footer/menu ou layouts só para “melhorar” o modelo. Mudança estrutural exige pedido explícito.

---

## Índice das referências

| Categoria | Página | URL |
|-----------|--------|-----|
| Review curta | Consul CF04NAR | `/review-fogao-4-bocas-consul/` |
| Review curta | Consul CFO4VAR | `/review-fogao-mesa-de-vidro-consul/` |
| Review curta | Electrolux FE4IW | `/review-fogao-4-bocas-electrolux/` |
| Review longa | Brastemp BFS5NCR | `/brastemp-bfs5ncr-vale-a-pena/` |
| Guia | Melhor Fogão 5 Bocas | `/melhores/melhor-fogao-5-bocas/` |
| Comparativo | Fogão 4 vs 5 bocas | `/comparativo-fogao-4-vs-5-bocas/` |

---

# 1. Reviews curtas

Páginas estáticas em `src/pages/review-*.astro` (ou slug equivalente).  
Objetivo: decisão rápida de SKU — perfil, limitações, oferta, veredito — sem profundidade de pillar.

**Família de implementação:** as três reviews abaixo compartilham o mesmo DNA estrutural. Use qualquer uma como base; as notas por página destacam o que cada uma ancora no projeto.

---

## 1.1 Review Consul CF04NAR

| Campo | Valor |
|-------|--------|
| **Arquivo** | `src/pages/review-fogao-4-bocas-consul.astro` |
| **URL** | `/review-fogao-4-bocas-consul/` |
| **Cluster** | Fogão 4 bocas (hub: `/melhores/melhor-fogao-4-bocas/`) |
| **Papel no ranking** | Melhor geral |

### Motivo

Primeira review curta consolidada do cluster 4 bocas. Âncora do padrão “perfil → oferta → diferenciação → limitações → análise técnica → tabela lateral → objeções → veredito → FAQ”. Tom direto, medalha de equilíbrio, sem ficha técnica tabular longa.

### Componentes reutilizados

- `BaseLayout.astro`
- `EditorialTrustRibbon.astro`
- `ProductMedia.astro`
- `AffiliateOfferBlock.astro` (`variant="featured"`)
- `TechnicalFigure.astro` (ex.: L06A em trempes)
- `EditorialLinks.astro`
- `RelatedContent.astro`
- `SmartRecommendations.astro`
- Dados: `src/data/products.ts` (`produtos.consulCF04NAR`)

### Arquitetura

1. Frontmatter com consts tipadas (headline, summary, idealFor / notIdealFor, análises, comparisonRows, objections, faqItems, verdict).
2. JSON-LD (`WebPage` / `BreadcrumbList` / `FAQPage` conforme o arquivo).
3. `<article class="mx-auto max-w-3xl …">` — coluna única de leitura.
4. Sequência de seções com `aria-labelledby` e H2 `font-display`.
5. CTAs afiliados: bloco `AffiliateOfferBlock` + CTAs inline / no veredito (ML + Shopee).
6. Interlinks para hub 4 bocas, custo-benefício, como escolher e comparativo 4×5.

### Padrão editorial

- H1 no formato “vale a pena?” / decisão (ver `EDITORIAL_NAMING_CONVENTIONS.md`).
- Resposta em 1 parágrafo (summary) logo abaixo do H1.
- Cards “faz sentido / não compensar” + família + rotina.
- Análise técnica em quatro eixos: forno, trempes, consumo, limpeza.
- Comparação lateral em `table-premium` (critério × modelo × alternativa).
- Veredito curto que redireciona para Atlas / Electrolux / 5 bocas conforme perfil.
- Máximo de links internos por seção conforme regra de interlinkagem editorial.

### Quando utilizar como modelo

- Nova **review curta** de SKU no cluster 4 bocas (mesa inox / equilíbrio).
- SKU “melhor geral” ou meio de faixa, sem necessidade de ficha tabular completa.
- Quando a página deve espelhar o funil do hub 4 bocas sem virar pillar.

---

## 1.2 Review Consul CFO4VAR

| Campo | Valor |
|-------|--------|
| **Arquivo** | `src/pages/review-fogao-mesa-de-vidro-consul.astro` |
| **URL** | `/review-fogao-mesa-de-vidro-consul/` |
| **Cluster** | Mesa de vidro (hub: `/melhores/melhor-fogao-mesa-de-vidro/`) |
| **Papel no ranking** | Melhor geral |

### Motivo

Review curta de referência para o eixo **mesa de vidro**. Mesma arquitetura da família CF04NAR/FE4IW, com ficha técnica (`specsRows`) e wiring de patrimônio visual Tipo B (ex.: L05A). Modelo oficial quando o diferencial do SKU é o tampo / limpeza / grades de ferro fundido.

### Componentes reutilizados

- Mesmos da família de review curta (`BaseLayout`, `EditorialTrustRibbon`, `ProductMedia`, `AffiliateOfferBlock`, `TechnicalFigure`, `EditorialLinks`, `RelatedContent`, `SmartRecommendations`).
- Dados: `produtos.consulCFO4VAR`
- Ativo técnico: `TechnicalFigure` alinhado à Biblioteca Técnica (vidro × inox / tampo).

### Arquitetura

Idêntica à família de review curta, com acréscimo típico de:

- tabela de especificações (`specsRows`) quando a ficha comercial justifica;
- âncoras e links para hub de mesa de vidro e satélites do cluster vidro;
- referência comercial explícita (ex.: CFO4VAR / CFO4VARUNA) no summary.

### Padrão editorial

- Posiciona o SKU no ranking de **acabamento** (vidro), não só de número de bocas.
- Limitações honestas da categoria (impacto, abrasivos).
- Alternativas laterais: Brastemp premium / Atlas entrada / upgrade 5 bocas.
- Mesma disciplina de veredito e FAQ da família curta.

### Quando utilizar como modelo

- Nova review curta cujo eixo principal é **mesa de vidro** (ou acabamento equivalente).
- Quando for necessário incluir **ficha técnica tabular** na review curta.
- Wiring de ativo Tipo B de tampo / limpeza na análise técnica.

---

## 1.3 Review Electrolux FE4IW

| Campo | Valor |
|-------|--------|
| **Arquivo** | `src/pages/review-fogao-4-bocas-electrolux.astro` |
| **URL** | `/review-fogao-4-bocas-electrolux/` |
| **Cluster** | Fogão 4 bocas |
| **Papel no ranking** | Melhor premium |

### Motivo

Review curta de referência para o papel **premium com propósito**. Demonstra como justificar ticket mais alto (forno PerfectCook/VaporBake, linha Efficient) sem transformar a página em review longa. Inclui `specsRows` e comparação lateral contra Consul (equilíbrio) e Atlas (entrada).

### Componentes reutilizados

- Mesma família de review curta.
- Dados: `produtos.electroluxFE4IW`
- `TechnicalFigure` (ex.: L06A) na seção de trempes / uso.

### Arquitetura

Família review curta + ficha técnica (`specsRows`) + ênfase editorial no **motivo do premium** (forno / visual), não só na marca.

### Padrão editorial

- `notIdealFor` explícito: quem não usa forno além do básico não deve pagar Efficient.
- Objeções tipadas: “vale mais que o Consul?”, “vale mais que o Atlas?”.
- Veredito redireciona para equilíbrio (CF04NAR) ou tamanho (5 bocas) quando o premium não fecha.
- Tom de autoridade sem hipérbole de marketing de fabricante.

### Quando utilizar como modelo

- Review curta de SKU **premium** ou “melhor premium” do ranking.
- Quando o diferencial for **recurso de forno / linha**, não só preço.
- Páginas que precisam de ficha técnica + comparação lateral na mesma estrutura curta.

---

# 2. Reviews longas

---

## 2.1 Brastemp BFS5NCR

| Campo | Valor |
|-------|--------|
| **Arquivo** | `src/pages/brastemp-bfs5ncr-vale-a-pena.astro` |
| **URL** | `/brastemp-bfs5ncr-vale-a-pena/` |
| **Cluster** | Fogão 5 bocas |
| **Papel** | Análise completa / pillar de SKU |

### Motivo

Única review longa consolidada como modelo oficial. Profundidade maior que as reviews curtas: decisão rápida, EEAT, notas por critério, ficha, design, uso, forno, limpeza, concorrentes, prós/contras, público, veredito e FAQ ampliado. Schema mais rico (`Article`, datas, `BreadcrumbList`, `FAQPage`).

### Componentes reutilizados

- `BaseLayout.astro`
- `Breadcrumbs.astro`
- `ProductMedia.astro`
- `AffiliateOfferBlock.astro`
- `TechnicalFigure.astro`
- `EditorialLinks.astro`
- `RelatedContent.astro`
- `SmartRecommendations.astro`
- Dados: `produtos` + `PRODUCT_IMAGE_REVIEW` (`src/data/productImages.ts`)

**Nota:** a review longa usa `Breadcrumbs` + bloco EEAT próprio; não depende de `EditorialTrustRibbon` como as reviews curtas.

### Arquitetura

1. Página estática dedicada (slug de intenção “vale a pena” — ver `workflow-pages.md`).
2. Header com eyebrow de atualização + H1 + lead longo com link ao hub.
3. Bloco **Decisão rápida** (vale / pode não valer).
4. Transparência editorial (EEAT) + mídia do produto.
5. Resumo com **notas por critério** (`scoreRows`).
6. Oferta afiliada cedo no funil.
7. Corpo em seções analíticas sequenciais (ficha → design → uso → forno → limpeza → concorrentes → prós/contras → público → quando não escolher → comparativo → veredito).
8. FAQ amplo + recomendações editoriais.
9. JSON-LD com `Organization` / `WebSite` / `WebPage` / `Article` / `BreadcrumbList` / `FAQPage`.

### Padrão editorial

- Abre com resposta de decisão, depois aprofunda — não o contrário.
- Notas numéricas só como apoio escaneável; o texto carrega o julgamento.
- Compara com alternativas do hub 5 bocas sem canibalizar o ranking.
- Tom de análise completa 2026, com freshness explícito no eyebrow / datas.
- Interlinks para `/melhores/melhor-fogao-5-bocas/` como dono da intenção de ranking.

### Quando utilizar como modelo

- Nova **review longa** / pillar de um SKU estratégico.
- Quando a intenção de busca exige “análise completa” além do funil curto do hub.
- SKUs 5 bocas (ou equivalente) com peso alto de autoridade e receita.
- **Não** usar para reviews de medalha rápida do ranking — aí a família curta (seção 1) é o modelo.

---

# 3. Guias

---

## 3.1 Melhor Fogão 5 Bocas

| Campo | Valor |
|-------|--------|
| **Arquivo (entrada)** | `src/content/melhores/melhor-fogao-5-bocas.md` |
| **Template** | `src/pages/melhores/[slug].astro` |
| **Blocos comerciais** | `src/data/commercialGuideBlocks.ts` (`melhor-fogao-5-bocas`) |
| **Fragmentos MD** | `_melhor-fogao-5-bocas-justificativas`, `-como-avaliamos`, `-perfil`, `-antes`, `-aprofundar` |
| **URL** | `/melhores/melhor-fogao-5-bocas/` |
| **Tipo** | Página de Decisão / hub comercial (money page) |

### Motivo

Modelo oficial de **Página de Decisão** do projeto (`MANUAL_PAGINA_DECISAO.md`). Configuração geral do cluster Fogão 5 bocas: ranking TLDR, cards de oferta, tabela comparativa, justificativas por medalha e módulos editoriais. Referência para qualquer novo hub “melhor X”.

### Componentes reutilizados

- `BaseLayout.astro`
- `Breadcrumbs.astro`
- `EditorialTrustRibbon.astro`
- `HomeTopProducts.astro` — cards com CTAs afiliados
- `HomeComparisonTable.astro` — tabela do ranking
- `RelatedContent.astro` / `SmartRecommendations.astro`
- Hero via `astro:assets` + `editorialImageSpecs`
- Dados: `commercialGuideBlocks.ts`, `products.ts`, collection `melhores`

### Arquitetura

```text
Frontmatter MD (title, headline, lead, dek, tldr, ctas, faq, cover)
        ↓
[slug].astro detecta CommercialGuideId
        ↓
Intro MD + HomeTopProducts + HomeComparisonTable
        ↓
Módulos MD na ordem de moduleIds
        ↓
FAQ + recomendações
```

- Rota dinâmica da collection `melhores` (não criar página `.astro` solta para o hub).
- CTAs de compra concentrados nos blocos comerciais + markdown de justificativas — não espalhar botões novos no template global.
- Canonical com barra final (`trailingSlash`).

### Padrão editorial

- Fluxo mental: ranking → ofertas → porquê das medalhas → perfil → validar → aprofundar → FAQ.
- TLDR com três medalhas e âncora `#guia-comercial-produtos`.
- Copy escaneável; educação profunda fica em blog/satélites com link.
- Uma intenção = uma URL dona (`melhor fogão 5 bocas` → este hub).
- Interlinks para comparativo 4×5 quando a dúvida ainda for de tamanho.

### Quando utilizar como modelo

- Novo **guia / hub comercial** (“melhor fogão …”).
- Expansão de cluster com ranking de 3 modelos + ofertas.
- Qualquer Página de Decisão que reutilize `HomeTopProducts` + `HomeComparisonTable` + fragmentos `_*-justificativas` etc.
- **Não** usar como modelo de review individual nem de comparativo de formato.

---

# 4. Comparativos

---

## 4.1 Comparativo Fogão 4 vs 5 bocas

| Campo | Valor |
|-------|--------|
| **Arquivo** | `src/pages/comparativo-fogao-4-vs-5-bocas.astro` |
| **URL** | `/comparativo-fogao-4-vs-5-bocas/` |
| **Tipo** | Comparativo de decisão (formato / tamanho) |
| **Intenção dona** | “fogão 4 ou 5 bocas” / escolher tamanho |

### Motivo

Comparativo de referência para **decisão de eixo** (não de SKU). Fecha o tamanho pela rotina real e encaminha ao hub certo. Sem CTAs de compra de produto específico no funil principal — monetização via próximo passo editorial (guias 4 ou 5 bocas).

### Componentes reutilizados

- `BaseLayout.astro`
- `EditorialTrustRibbon.astro`
- `EditorialLinks.astro`
- `RelatedContent.astro`
- `SmartRecommendations.astro`
- Dados editoriais: `findEntry` em `src/data/editorialContent.ts` (reviews e guias relacionados)
- Tabela comparativa HTML com classes `table-premium` / shell (padrão visual do projeto)
- JSON-LD: `WebPage` + `FAQPage`

### Arquitetura

1. Página estática dedicada.
2. Hero editorial (eyebrow Comparativo + H1 + lead) + trust ribbon.
3. **Resumo rápido** + aside de observação editorial.
4. **Tabela** 4 vs 5.
5. Corpo: regra prática → quando 4 → quando 5 → espaço → custo → checklist → conclusão.
6. Bloco **Próximos passos** (links para hubs 4 e 5 bocas / satélites).
7. FAQ + recomendações.
8. Sem `AffiliateOfferBlock` de SKU — o CTA é ir ao ranking do tamanho escolhido.

### Padrão editorial

- Regra prática mensurável (contar panelas em dia normal).
- Não ranquear marcas; não roubar intenção dos hubs.
- Após a decisão de tamanho, um caminho claro para `/melhores/melhor-fogao-4-bocas/` ou `/melhores/melhor-fogao-5-bocas/`.
- FAQ cobre objeções de família, espaço, preço e ordem (tamanho antes de acabamento).
- Interlinkagem: poucos links, propósito claro, âncoras descritivas.

### Quando utilizar como modelo

- Novo **comparativo de formato / eixo** (ex.: vidro vs inox, embutir vs piso — quando for página dedicada de decisão binária).
- Páginas cuja pergunta única é “qual caminho seguir?”, não “qual SKU comprar?”.
- **Não** usar para comparativo marca A vs marca B de SKUs (esse tipo ainda não tem referência elevada neste documento).

---

## Mapa rápido: qual referência abrir

| Você vai implementar… | Abra como modelo |
|------------------------|------------------|
| Review curta de equilíbrio / entrada–meio | CF04NAR (§1.1) |
| Review curta de mesa de vidro / acabamento | CFO4VAR (§1.2) |
| Review curta premium com ficha | FE4IW (§1.3) |
| Review longa / pillar SKU | BFS5NCR (§2.1) |
| Hub “melhor …” com ranking + ofertas | Melhor Fogão 5 Bocas (§3.1) |
| Comparativo binário de decisão (eixo) | 4 vs 5 bocas (§4.1) |

---

## Governança

- Elevação ou remoção de referência: decisão explícita do projeto + atualização deste arquivo.
- Mudança estrutural em uma página modelo: atualizar a seção correspondente **depois** da mudança estável em produção.
- Este documento **não** lista páginas satélite, blogs ou reviews rápidas secundárias — só modelos oficiais de implementação.
- Links internos nas implementações: sempre com barra final (`urls-internas`).

---

## Documentos relacionados

| Documento | Uso |
|-----------|-----|
| `MANUAL_PAGINA_DECISAO.md` | Fluxo e regras do hub comercial |
| `EDITORIAL_IMPLEMENTATION_RULES.md` | Verificação técnica e build |
| `EDITORIAL_NAMING_CONVENTIONS.md` | H1 / Title / âncoras |
| `PADROES_DE_COMPONENTES.md` | Quando reutilizar cada componente |
| `workflow-pages.md` | Checklist de criação de review |
| `seo-rules.md` | Canonical, intenção, donos de URL |
| `MASTER_ROADMAP_EDITORIAL.md` | Status e prioridade de conteúdo |
