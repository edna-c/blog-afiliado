## Workflow para novas páginas de review

Fluxo padrão para criar páginas de review novas (ex.: novos modelos de fogão) mantendo consistência com a arquitetura atual.

---

## 1. Planejamento da página

- **Definir objetivo da review**
  - Modelo exato (marca, código, variações relevantes).
  - Papel da página no funil (review longa, review rápida, comparativa, etc.).
- **Escolher tipo de rota**
  - **Página estática dedicada** (`src/pages/<slug-do-modelo>.astro`) — para reviews longas e pillar pages.
  - **Página dinâmica baseada em parâmetro** (`src/pages/review-fogao-5-bocas-[marca].astro`) — para famílias de produto com estrutura repetível.
- **Listar termos principais**
  - Nome do modelo, variações (“vale a pena?”, “review”, ano atual).
  - Decidir se haverá foco em ano (ex.: 2026) no título/description.

---

## 2. Checklist SEO (antes de começar a codar)

- **Título (title)**
  - Incluir modelo + intenção de busca (ex.: “vale a pena?”, “review completo”) + marca do site.
  - Limitar a ~60–65 caracteres quando possível, sem sacrificar clareza.
- **Meta description**
  - Resumo em 1–2 frases, prometendo benefício claro.
  - Incluir modelo + contexto de uso (custo-benefício, rotina, espaço, etc.).
- **Slug / URL**
  - Curto, descritivo e em minúsculas, com hífens (ex.: `/brastemp-bfs5ncr-vale-a-pena`).
  - Evitar datas no slug — manter ano apenas em título/description/conteúdo.
- **Canonical**
  - Definir URL única e evitar variações com/sem barra.
  - Para novas reviews, preferir **sem barra final** na string usada para o `URL` (seguir padrão atual da maioria das páginas).
- **Open Graph / social**
  - Ter imagem clara do produto ou da categoria.
  - Conferir como o título/description ficam em cards sociais.
- **Schema**
  - Definir qual(s) tipo(s) serão usados: `Article`, `Product`, `FAQPage`, `BreadcrumbList`, `Organization`/`WebSite` (quando fizer sentido).

---

## 3. Estrutura base da página `.astro`

1. **Imports**
   - `BaseLayout` sempre.
   - Componentes reutilizáveis (ex.: `Breadcrumbs`, `RelatedArticles`, `EditorialTrustRibbon`, `AffiliateOfferBlock`).
   - Dados em `src/data` (ex.: `produtos` em `data/products.ts`, `relatedPages`).
2. **Consts de SEO e dados**
   - `const site = Astro.site ?? new URL('https://casapraticaeletro.com.br');`
   - `const canonicalPath = '/slug-da-pagina/';` **ou** usar `Astro.url.pathname` se for dinâmica.
   - `const canonical = new URL(canonicalPath.replace(/^\//, ''), site).href;`
   - `const seoTitle = '... | Casa Prática Eletro';`
   - `const metaDescription = '...';`
   - Datas de publicação/atualização (ISO 8601) quando fizer sentido:
     - `const publishedTime = '2026-05-01T10:00:00-03:00';`
     - `const modifiedTime = '2026-05-06T10:00:00-03:00';`
   - Imagem OG absoluta:
     - `const ogImageUrl = new URL('images/arquivo.webp', site).href;`
3. **JSON-LD (schema)**
   - Montar objeto `structuredData` ou `graph` para `@graph` com os tipos definidos na etapa de SEO.
4. **Markup**
   - `<BaseLayout ... openGraph={{ ... }}>`
   - `<script type="application/ld+json" slot="head" set:html={JSON.stringify(structuredData)} />`
   - `<article>` com:
     - `<Breadcrumbs>` (quando fizer sentido).
     - `<h1>` único coerente com `seoTitle` (mas não precisa repetir o sufixo “| Casa Prática Eletro”).
     - Seções escaneáveis (subtítulos, listas, tabelas de prós/contras, CTA de oferta).

---

## 4. Metadata detalhada

- **`BaseLayout`**
  - `title`: usar `seoTitle`.
  - `description`: usar `metaDescription`.
  - `canonical`: usar `canonical`.
  - `openGraph`: objeto com:
    - `title`: `seoTitle` ou variação curta.
    - `description`: `metaDescription`.
    - `url`: `canonical`.
    - `image` / `imageAlt`: URL absoluta e alt descritivo.
    - `type`: `article`.
    - `publishedTime` / `modifiedTime`: se for review longa ou conteúdo com data.
- **Outros metadados**
  - Certificar que a página tem H1 único.
  - Garantir consistência de ano entre título, description, hero e corpo do texto.

---

## 5. Schema (JSON-LD)

### 5.1. Review longa de produto (padrão `brastemp-bfs5ncr-vale-a-pena.astro`)

- Usar `@graph` com:
  - `Organization` (`@id` global do site, nome, URL, logo).
  - `WebSite` (nome do site, URL, publisher = Organization).
  - `WebPage` (nome/descrição da página, `@id` próprio, `isPartOf` = WebSite, `breadcrumb`).
  - `BreadcrumbList` (Início → Review [Modelo]).
  - `Article` (headline, description, image, `datePublished`, `dateModified`, `articleSection`, `inLanguage`).
  - `FAQPage` opcional, quando houver bloco de perguntas no conteúdo.

### 5.2. Review rápida / página de família (`review-fogao-5-bocas-[marca].astro`)

- Focar em:
  - `BreadcrumbList` simples (Início → Review Marca).
  - `Product`:
    - `name`: modelo.
    - `description`: resumo da review.
    - `image`: lista de URLs absolutas.
    - `brand`: `{ '@type': 'Brand', name }`.
    - `offers`: `{ '@type': 'Offer', url, priceCurrency: 'BRL' }` (sem preço fixo).
- Se houver FAQ visível, considerar `FAQPage` adicional.

### 5.3. Boas práticas gerais

- Usar sempre `site` + `new URL()` para gerar URLs absolutas.
- Manter `@id` coerentes (`#webpage`, `#article`, `#breadcrumb`, `#faq`) quando a página reutilizar padrões do blog.
- JSON-LD em `<script type=\"application/ld+json\" slot=\"head\">` para garantir inclusão no `<head>`.

---

## 6. Interlinkagem

- **Para dentro da própria vertical**
  - Incluir `RelatedArticles` apontando para:
    - Guia mestre da categoria (ex.: “Melhor fogão 5 bocas”).
    - Outros reviews complementares (outras marcas / versões).
  - Usar `relatedPages.ts` como fonte única para títulos/descrições/hrefs.
- **Entre blog e reviews**
  - Em reviews, linkar para artigos do blog que aprofundem temas (ex.: “fogão com mesa de vidro”, “fogão embutir ou de piso”).
  - Nos posts de blog, apontar para as reviews mais relevantes via `RelatedArticles`.
- **Navegação global**
  - Checar se a página precisa ser adicionada a menus (`navigation.ts`) ou apenas a seções de “veja também”.

---

## 7. Imagens

- **Tipos de imagem**
  - Imagens de produto: `public/images/reviews|blog/...` (nomes `*-review-premium.webp` / `*-blog-premium.webp`); mapa em `src/data/productImages.ts`.
  - Hero / imagens de conteúdo: preferir `src/assets/...` com `Picture` (benefício de otimização Astro).
- **Requisitos mínimos**
  - Resolução boa para preview social (padrão 1200×630 ou similar).
  - Peso razoável (usar WebP/AVIF quando possível).
  - `alt` descritivo, mencionando modelo e contexto (ex.: “Fogão 5 bocas inox modelo BFS5NCR em cozinha planejada”).
- **Uso em Open Graph**
  - Via `openGraph.image` com URL absoluta.
  - Conferir carregamento correto em build (`astro build` + `astro preview` ou ferramenta de debug OG).

---

## 8. Revisão antes de publicar

### 8.1. Revisão editorial

- Conferir:
  - Clareza e honestidade do texto (sem promessas exageradas).
  - Seções bem escaneáveis (subtítulos, listas, boxes de destaque).
  - Coerência de tom com outras páginas (direto, útil, sem jargão desnecessário).

### 8.2. Revisão técnica/SEO

- Rodar o projeto em dev (`bun dev`) e revisar:
  - `<title>` e `<meta name=\"description\">` no navegador (DevTools → Elements).
  - `link rel=\"canonical\"` correto.
  - Metatags OG/Twitter preenchidas para a página.
  - JSON-LD válido (usar Rich Results Test / ferramentas de validação Google).
  - Breadcrumbs funcionais e coerentes.
  - Links internos levando para URLs existentes (sem 404).

### 8.3. Revisão de build

- Executar:
  - `bun build`
  - `bun preview` e navegar até a nova rota.
- Conferir:
  - Se a página foi incluída no sitemap (gerado pelo `@astrojs/sitemap`).
  - Se não há imagens quebradas ou paths errados entre `public/` e `src/assets/`.

### 8.4. Checklist final

- [ ] Slug e título conferidos.
- [ ] Description revisada e sem truncar frase crítica.
- [ ] Canonical definido.
- [ ] Open Graph com imagem e alt corretos.
- [ ] JSON-LD válido (Article/Product/Breadcrumb/FAQ conforme o caso).
- [ ] Interlinkagem para guias, blog e outras reviews.
- [ ] Imagens carregando bem (peso e nitidez ok).
- [ ] Conteúdo lido em voz alta / revisão de português.

