# Blueprint do site — Casa Prática Eletro

Visão da arquitetura **atual** do repositório (Astro 6, saída estática, Tailwind 4). Útil para onboarding e manutenção da Fase 1.

Complementos: `README.md` (estado atual), `docs/ROADMAP-PLATAFORMA.md` (evolução), `docs/seo-rules.md`.

## Visão geral técnica

| Camada | Escolha |
|--------|---------|
| Framework | [Astro](https://astro.build/) 6.x |
| Renderização | `output: 'static'` — HTML pré-gerado em `dist/` |
| Estilo | Tailwind CSS 4 via `@tailwindcss/vite` + `src/styles/global.css` |
| Conteúdo editorial | Content Collections `blog` + `melhores` (`src/content.config.ts`, schema Zod) |
| Product Inventory | `src/data/products.ts` — URLs afiliadas (SSOT) |
| Ops | `src/modules/affiliate-monitor/` — CLI fora do build do site |
| SEO auxiliar | `@astrojs/sitemap` + metadados no `BaseLayout` (`docs/seo-rules.md`) |
| Runtime JS | Mínimo; páginas majoritariamente HTML + CSS |

Domínio: `https://casapraticaeletro.com.br` (`astro.config.mjs`).

---

## Estrutura de diretórios

```text
casa-pratica-eletro/
├── astro.config.mjs
├── package.json                 # dev, build, preview, check, test, monitor:affiliates
├── vercel.json                  # trailingSlash + redirects permanentes
├── public/                      # assets por URL raiz (/images/...)
├── docs/                        # manuais, ROADMAP, CHANGELOG, auditorias
├── src/
│   ├── layouts/BaseLayout.astro
│   ├── pages/                   # file-based routing
│   ├── components/              # UI Astro
│   ├── content/blog/            # → /blog/<id>/
│   ├── content/melhores/        # → /melhores/<id>/ (fragments _* não viram rota)
│   ├── content.config.ts
│   ├── data/                    # navigation, products, editorial, commercial blocks…
│   ├── modules/affiliate-monitor/
│   ├── utils/
│   ├── styles/global.css
│   └── assets/                  # astro:assets (Picture)
└── dist/                        # build (não versionar)
```

**Imagens:** `src/assets/...` (otimizadas no build) · `public/images/...` (URLs fixas; ver `productImages.ts`).

---

## Layout e shell

`BaseLayout.astro`: head (title, description, canonical, OG), skip link, `Header` + `main` + `Footer` + `WhatsAppFloat`.

Navegação: `src/data/navigation.ts` → `Header` / `HeaderPrimaryNavLinks`. Ativo: `src/utils/isNavActive.ts`.

---

## Componentes

### Em uso no fluxo atual

| Componente | Função |
|------------|--------|
| `Header` / `HeaderPrimaryNavLinks` / `Footer` / `WhatsAppFloat` | Shell |
| `Hero` / `LogoStrip` / `HomeTopProducts` / `HomeComparisonTable` | Home comercial |
| `HomeGuideSection` / `HomeMelhoresSection` / `BlogGrid` / `HomeSeeAlso` / `HomeFaqSection` | Home / listagens |
| `Breadcrumbs` / `EditorialTrustRibbon` / `AffiliateOfferBlock` / `ProductMedia` | Guias e reviews |
| `RelatedContent` / `EditorialLinks` / `SmartRecommendations` | Interlink (via `editorialContent.ts`) |
| `YouTubeBrandLink` | Contato / footer |

### Sem import atual (candidatos — ver `AUDITORIA-COMPONENTES-ORFAOS.md`)

`AboutSection`, `LeadFormSection`, `NewsletterBar`, `ProcessSection`, `ServiceRows`, `TestimonialSection`, `RelatedArticles` (+ shim `data/relatedPages.ts`).

---

## Páginas (`src/pages/`)

### Hub e institucional

| Arquivo | Rota |
|---------|------|
| `index.astro` | `/` |
| `blog.astro` | `/blog/` |
| `melhores/index.astro` | `/melhores/` |
| `sobre.astro` / `contato.astro` / `politica-de-afiliados.astro` | institucionais |
| `404.astro` | 404 |

### Funil fogão 5 bocas (HTML dedicado)

Satélites com conteúdo inline + `RelatedContent` / `SmartRecommendations`:

| Arquivo | Função |
|---------|--------|
| `como-escolher-fogao-5-bocas.astro` | Critérios |
| `comparativo-fogao-4-vs-5-bocas.astro` | Comparativo de formato |
| `fogao-5-bocas-custo-beneficio.astro` | Ângulo preço/valor |

O ranking **Melhor fogão 5 bocas** vive na **home** (`/#top-produtos`). Em `/melhores/` o card existe só como atalho (sem rota própria). URLs antigas 301 → `/` no `vercel.json`.

### Reviews

| Arquivo | Notas |
|---------|--------|
| `brastemp-bfs5ncr-vale-a-pena.astro` | Review longa; CTAs via `produtos.*` |
| `review-fogao-5-bocas-[marca].astro` | `getStaticPaths` (marcas); links de `products.ts` |

### Dinâmicos

| Arquivo | Rota |
|---------|------|
| `blog/[slug].astro` | `/blog/<id>/` |
| `melhores/[slug].astro` | `/melhores/<id>/` (ignora entries `_`) |

---

## Camada de dados (`src/data/`)

| Arquivo | Papel |
|---------|--------|
| `products.ts` | **SSOT** de URLs afiliadas |
| `commercialGuideBlocks.ts` | Cards/tabela/ranking dos guias money page (consome `products`) |
| `editorialContent.ts` | Pool de interlinkagem (kind, topics, flow) |
| `navigation.ts` | Menu principal |
| `productImages.ts` / `editorialImageSpecs.ts` / `blogThumbnailAssets.ts` | Imagens / specs |
| `whatsapp.ts` / `siteContact.ts` | Contato |
| `relatedPages.ts` | Shim legado (só `RelatedArticles`) — ver auditoria de órfãos |

**Nota SSOT:** fragmentos `_*-justificativas.md` ainda embutem hrefs afiliados literais iguais ao inventário. Ver `docs/AUDITORIA-SSOT-AFILIADOS.md` (correção só com aprovação).

---

## Módulo operacional

`src/modules/affiliate-monitor/` — inventário → collectors → validators → reports. CLI: `npm run monitor:affiliates`. Doc: `src/modules/affiliate-monitor/README.md`.

---

## Documentos relacionados

- `README.md` — onboarding e comandos
- `docs/ROADMAP-PLATAFORMA.md` — evolução e governança
- `docs/CHANGELOG.md` — histórico de docs
- `docs/seo-rules.md` — SEO detalhado
- `docs/AUDITORIA-SSOT-AFILIADOS.md` / `docs/AUDITORIA-COMPONENTES-ORFAOS.md` — manutenção Fase 1
