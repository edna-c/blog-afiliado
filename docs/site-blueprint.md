# Blueprint do site — Casa Prática Eletro

Visão da arquitetura atual do repositório (Astro 6, saída estática, Tailwind 4). Útil para onboarding, refactors e planejamento de novas seções.

## Visão geral técnica

| Camada | Escolha |
|--------|---------|
| Framework | [Astro](https://astro.build/) 6.x |
| Renderização | `output: 'static'` — HTML pré-gerado em `dist/` |
| Estilo | Tailwind CSS 4 via `@tailwindcss/vite` + `src/styles/global.css` |
| Conteúdo editorial | Content Collections (`src/content/blog`, loader glob + schema Zod em `src/content.config.ts`) |
| SEO auxiliar | `@astrojs/sitemap` + metadados no `BaseLayout` (ver `docs/seo-rules.md`) |
| Runtime JS | Mínimo; páginas majoritariamente HTML + CSS |

Domínio configurado em `astro.config.mjs`: `https://casapraticaeletro.com.br`.

---

## Estrutura de diretórios

```text
casa-pratica-eletro/
├── astro.config.mjs          # site, integrações (sitemap), Vite/Tailwind
├── package.json              # scripts: dev, build, preview
├── public/                   # assets servidos como estáticos (URL raiz)
│   ├── favicon.svg
│   └── images/               # imagens de produto / OG usadas por caminhos /images/...
├── docs/                     # documentação do projeto (SEO, blueprint, workflows)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro  # shell HTML: head, Header, main, Footer, WhatsApp float
│   ├── pages/                # file-based routing (cada .astro = rota)
│   ├── components/           # blocos UI Astro reutilizáveis
│   ├── content/
│   │   └── blog/             # posts .md / .mdx (collection `blog`)
│   ├── content.config.ts     # define collection `blog` + schema
│   ├── data/                 # dados de navegação, links de afiliado, páginas relacionadas
│   ├── utils/                # helpers (ex.: destaque de link ativo no nav)
│   ├── styles/
│   │   └── global.css        # tokens Tailwind + estilos globais
│   └── assets/               # imagens importáveis no build (astro:assets, Picture)
└── dist/                     # saída do `build` (não versionar)
```

**Convenção de imagens**

- `src/assets/...` — otimização via `astro:assets` (`Picture`, imports tipados).
- `public/images/reviews|blog/...` — URLs fixas para produto (reviews/OG) e capas do blog (`*-blog-premium.webp`); ver `src/data/productImages.ts`.

---

## Layout e shell global

**`BaseLayout.astro`** concentra:

- `<head>`: charset, viewport, título, descrição, canonical opcional, Open Graph opcional, slot `head` (ex.: JSON-LD).
- Acessibilidade: link “Pular para o conteúdo principal”, `<main id="conteudo-principal">`.
- **`Header`** + **`Footer`** + **`WhatsAppFloat`** em todas as páginas que usam o layout.

Navegação principal vem de **`src/data/navigation.ts`** (`primaryNav`), consumida por **`Header.astro`** / **`HeaderPrimaryNavLinks.astro`**. Estado ativo da rota: **`src/utils/isNavActive.ts`**.

---

## Componentes

### Acoplados ao fluxo atual

Componentes importados por páginas ou pelo layout:

| Componente | Função resumida |
|------------|-----------------|
| `Header.astro` | Logo, menu responsivo, CTA contato |
| `HeaderPrimaryNavLinks.astro` | Links do nav (mobile/desktop) |
| `Footer.astro` | Links institucionais + ano |
| `WhatsAppFloat.astro` | Botão flutuante; número via env / fallback em `data/whatsapp.ts` |
| `Hero.astro` | Hero da home (H1, ranking, imagem otimizada) |
| `HomeTopProducts.astro` | Cards de produtos + links ML/Shopee |
| `HomeComparisonTable.astro` | Tabela comparativa (usa `data/products.ts`) |
| `HomeGuideSection.astro` | Bloco de guias com links internos |
| `LogoStrip.astro` | Faixa de marcas/logos |
| `BlogGrid.astro` | Grade de posts (home e listagem `/blog`) |
| `HomeSeeAlso.astro` | Links transversais na home |
| `HomeFaqSection.astro` | FAQ da home + schema FAQPage (JSON-LD) |
| `Breadcrumbs.astro` | Trilha semântica (blog, review longa) |
| `RelatedArticles.astro` | Cards “ver também” (alimentado por `data/relatedPages.ts`) |
| `EditorialTrustRibbon.astro` | Faixa de confiança editorial (guias/reviews) |
| `AffiliateOfferBlock.astro` | CTA de oferta afiliada (review Brastemp) |

### Presentes no repositório, sem uso atual

Estes arquivos existem em `src/components/` mas **não são importados** por nenhuma página/layout no estado atual do código:

- `AboutSection.astro`
- `LeadFormSection.astro`
- `NewsletterBar.astro`
- `ProcessSection.astro`
- `ServiceRows.astro`
- `TestimonialSection.astro`

Servem como **biblioteca potencial** para novas landing pages ou podem ser removidos/arquivados se forem legado.

---

## Organização das páginas (`src/pages/`)

Astro deriva rotas a partir dos caminhos dos arquivos.

### Hub e institucional

| Arquivo | Rota (exemplo) | Notas |
|---------|----------------|--------|
| `index.astro` | `/` | Home: composição de seções “home” + últimos posts |
| `blog.astro` | `/blog` | Listagem de todos os posts da collection |
| `sobre.astro` | `/sobre` | Institucional |
| `contato.astro` | `/contato` | Contato |
| `politica-de-afiliados.astro` | `/politica-de-afiliados` | Transparência / afiliados |

### Funil “fogão 5 bocas” (HTML dedicado)

Páginas estáticas `.astro` com conteúdo inline e padrão recorrente `RelatedArticles` + `EditorialTrustRibbon`:

| Arquivo | Função |
|---------|--------|
| `melhor-fogao-5-bocas.astro` | Pillar / guia mestre (SEO rico: OG + JSON-LD) |
| `como-escolher-fogao-5-bocas.astro` | Guia de critérios |
| `comparativo-fogao-4-vs-5-bocas.astro` | Comparativo de formato |
| `fogao-5-bocas-custo-beneficio.astro` | Ângulo preço/valor |

### Reviews e produto

| Arquivo | Rota | Notas |
|---------|------|--------|
| `brastemp-bfs5ncr-vale-a-pena.astro` | `/brastemp-bfs5ncr-vale-a-pena` | Review longa; FAQ + offers; dados em página |
| `review-fogao-5-bocas-[marca].astro` | `/review-fogao-5-bocas-brastemp` etc. | `getStaticPaths` com três marcas; links de `data/products.ts` |

### Blog dinâmico

| Arquivo | Rota | Notas |
|---------|------|--------|
| `blog/[slug].astro` | `/blog/<id-do-arquivo>` | `getStaticPaths` a partir da collection; render MD/MDX; hero especial por tipo de post quando houver regra curada |

Os arquivos em `src/content/blog/*.md` geram **apenas** URLs sob `/blog/...` (não há `.md` em `pages/`).

---

## Camada de dados (`src/data/`)

| Arquivo | Papel |
|---------|--------|
| `navigation.ts` | Itens do menu principal |
| `products.ts` | **Fonte única** de URLs de afiliado (ML/Shopee) por SKU — home, tabela, reviews |
| `relatedPages.ts` | Lista tipada de “artigos relacionados” (títulos, descrições, hrefs) para `RelatedArticles` |
| `whatsapp.ts` | Constantes / fallback para o componente WhatsApp |

---

## Possibilidades de expansão futura

1. **Novas verticais de produto** — Repetir o padrão “pillar + satélites + reviews + rota dinâmica”: novas pastas de guias em `pages/`, novo arquivo em `data/products.ts`, entradas em `relatedPages.ts`, e opcionalmente nova subárvore em `content/blog`.

2. **Mais posts sem duplicar layout** — Adicionar `.md` em `src/content/blog/` respeitando o schema; rotas surgem automaticamente. Campos `faq` e `coverImage` já suportam SEO enriquecido.

3. **Componentes órfãos** — Reutilizar `AboutSection`, `NewsletterBar`, etc., em `/sobre`, home ou captura de lead; ou remover para reduzir ruído.

4. **Internacionalização** — Hoje `pt-BR` fixo no layout. Expansão exigiria estratégia i18n (rotas por locale ou subdomínio) e ajuste de `lang`/hreflang.

5. **APIs ou formulários dinâmicos** — O projeto é estático; formulários reais exigiria action serverless, serviço externo ou `output: 'hybrid'`/`server` com adaptador.

6. **Design system** — Centralizar tokens (já parcialmente em `global.css`) e padrões de seção para novos templates de “guia longo” com menos cópia de markup entre `.astro`.

7. **Testes e qualidade** — Adicionar `astro check`, lint/format ou testes E2E conforme o time crescer; hoje o foco é build estático + revisão manual.

---

## Documentos relacionados

- `docs/seo-rules.md` — metadados, OG, JSON-LD, checklist SEO.
- `docs/workflow-pages.md` — fluxo de trabalho em páginas (se mantido pelo time).
