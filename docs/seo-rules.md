# Padrões SEO atuais — Casa Prática Eletro

Documentação derivada do código em maio/2026. Serve como referência para manter consistência ao criar novas páginas ou ajustar metadados.

## Infraestrutura

| Item | Implementação |
|------|----------------|
| Framework | Astro, saída estática (`output: 'static'` em `astro.config.mjs`) |
| URL absoluta do site | `site: 'https://casapraticaeletro.com.br'` — usada pelo sitemap e por `Astro.site` |
| Sitemap | Integração `@astrojs/sitemap` — gera sitemap a partir das rotas estáticas no build |
| `robots.txt` | Não há arquivo dedicado em `public/`; regras de rastreamento não estão versionadas no repositório |

## Layout base (`src/layouts/BaseLayout.astro`)

Todas as páginas públicas passam por este layout. Props aceitas:

- **`title`** — `<title>`; padrão: `Casa Prática Eletro`
- **`description`** — `<meta name="description">`; padrão com texto institucional genérico
- **`canonical`** — opcional; quando informado, emite `<link rel="canonical" href="...">`
- **`openGraph`** — opcional; quando informado, emite bloco Open Graph + Twitter Cards

### O que o `<head>` sempre inclui

- `lang="pt-BR"` no `<html>`
- `charset="utf-8"`, `viewport`, `meta name="generator"` (Astro)
- **`meta name="google-site-verification"`** — valor fixo no layout (Search Console)
- `link rel="icon"` para `/favicon.svg`
- `<title>` e `meta name="description"` a partir das props

### Open Graph e Twitter

Só são renderizados se **`openGraph` for passado** como prop. Campos suportados pelo tipo `OpenGraphConfig`:

- Obrigatório na prática: **`url`** (URL canônica da página)
- Opcionais: `title`, `description` (se omitidos, reutilizam `title` / `description` do layout)
- `image`, `imageAlt` — se `image` existir: `og:image`, `og:image:alt`, `twitter:card` = `summary_large_image` e tags Twitter espelhando título, descrição e imagem; senão: apenas `twitter:card` = `summary`
- `type` — padrão `website`; posts/reviews usam `article`
- `locale` — padrão `pt_BR`
- `siteName` — padrão `Casa Prática Eletro`
- `publishedTime` / `modifiedTime` — quando presentes, emitem `article:published_time` e `article:modified_time`

### Slot `head`

Extensões por página: `<slot name="head" />` ao final do `<head>`. Uso típico: **JSON-LD** com `<script type="application/ld+json" slot="head">`.

## Padrões por tipo de página

### Páginas “simples” (sem Open Graph no código atual)

Passam apenas `title` e `description` em `BaseLayout`. **Não há canonical explícito nem tags sociais** — o HTML ainda tem description/title para SERP, mas compartilhamentos não recebem OG dedicado.

Exemplos: `index.astro`, `blog.astro`, `como-escolher-fogao-5-bocas.astro`, `comparativo-fogao-4-vs-5-bocas.astro`, `fogao-5-bocas-custo-beneficio.astro`, `sobre.astro`, `contato.astro`, `politica-de-afiliados.astro`.

**Home (`index.astro`):** inclui o componente `HomeFaqSection.astro`, que injeta um **`FAQPage`** em JSON-LD (script no corpo da página, não no slot `head`).

### Páginas com SEO “completo” (canonical + Open Graph + JSON-LD)

Convencionadas assim:

1. **`const site = Astro.site ?? new URL('https://casapraticaeletro.com.br');`** — fallback alinhado ao `site` do Astro config
2. **Canonical** — `new URL(caminhoOuPathname, site).href` (path absoluto ou `Astro.url.pathname`)
3. **`openGraph`** — `title`, `description`, `url`, `type`, imagem absoluta (`new URL(..., site)` ou caminho public), `imageAlt`; artigos também `publishedTime` / `modifiedTime` quando fizer sentido

#### Artigos do blog — `src/pages/blog/[slug].astro`

- Título no layout: **`${post.data.title} | Casa Prática Eletro`**
- Imagem OG: `post.data.coverImage` resolvida para URL absoluta, ou fallback `images/reviews/brastemp-bfs5ncr-review-premium.webp`
- **`@graph` Schema.org:** `Organization`, `BreadcrumbList` (Início → Blog → artigo), `WebPage`, `Article` (com `image`, autor/editora = organização, datas ISO, `articleSection` = categoria, `inLanguage: pt-BR`)
- Se o frontmatter tiver **`faq`**: inclui nó **`FAQPage`** ligado ao mesmo grafo

#### Review longa Brastemp — `src/pages/brastemp-bfs5ncr-vale-a-pena.astro`

- Canonical usa path com barra final (`/brastemp-bfs5ncr-vale-a-pena/`) antes de normalizar com `new URL`
- Grafo mais rico: `Organization` (com `logo`), `WebSite`, `WebPage` (com `primaryImageOfPage`, `breadcrumb`, `isPartOf`), `BreadcrumbList`, `Article`, `FAQPage`

#### Guia “melhor fogão 5 bocas” (rota dedicada) — `src/pages/melhor-fogao-5-bocas.astro`

- Canonical: `/melhor-fogao-5-bocas` (sem barra final no path passado ao `URL`)
- OG tipo `article` com imagem em `public`, `publishedTime` / `modifiedTime` fixos no frontmatter da página
- JSON-LD: **`BreadcrumbList`** + **`Article`** (estrutura mais enxuta que o blog; sem `@id` interligando entidades como na rota dinâmica do blog)

#### Reviews curtas por marca — `src/pages/review-fogao-5-bocas-[marca].astro`

- **`Product`** com `name`, `description`, `image`, `brand` (tipo `Brand`), **`Offer`** com `url` (link de oferta) e `priceCurrency: BRL` (sem `price` fixo no schema)
- `BreadcrumbList` simples (Início → review)
- Open Graph com imagem do produto por marca

## Conteúdo editorial (blog) — `src/content.config.ts`

Campos usados para SEO e metadados:

| Campo | Uso |
|-------|-----|
| `title` | H1, `<title>`, OG, Article |
| `description` | meta description, OG, Article |
| `pubDate` | Article, OG `publishedTime` |
| `updatedDate` (opcional) | Article, OG `modifiedTime` |
| `category` | Article `articleSection`, UI |
| `coverImage` (opcional) | OG e `Article.image`; caminho sob `/public` (ex.: `/images/...`) |
| `faq` (opcional) | `FAQPage` no JSON-LD |

## Convenções de texto

- **Sufixo de marca:** páginas editoriais longas costumam terminar o título com **`| Casa Prática Eletro`**
- **Ano no conteúdo:** várias páginas e componentes referenciam **2026** como contexto temporal (alinhar título/description com a revisão real do conteúdo)

## Regra estrutural principal

### 1 intenção principal = 1 URL principal

Esta é a regra mais importante da arquitetura SEO do projeto.

Cada keyword/intenção principal deve ter **uma URL dona clara**, com papel explícito no cluster. A meta não é "ter muitas páginas parecidas"; a meta é **concentrar sinal**, evitar canibalismo e deixar o Google entender qual URL deve ranquear para cada busca.

### Mapa-base atual do projeto

| Intenção principal | URL principal | Papel |
|------|----------------|--------|
| `melhor fogão 5 bocas` | `/melhor-fogao-5-bocas` | Hub / guia mestre comercial |
| `fogão 5 bocas custo benefício` | `/fogao-5-bocas-custo-beneficio` | Subintenção comercial por valor/preço |
| `fogão 4 bocas vale a pena` | `/blog/fogao-4-bocas-ainda-vale-a-pena/` | Editorial / lifestyle / reflexão de compra |
| `fogão embutir ou piso` | `/blog/guia-fogao-embutir-ou-de-piso/` | Guia de instalação e layout |
| `fogão 4 ou 5 bocas` | `/comparativo-fogao-4-vs-5-bocas` | Comparativo de decisão |
| `review por modelo` | `/review-fogao-5-bocas-<marca>` | Review curta por SKU/modelo |

### O que NÃO fazer

Não usar os seguintes atalhos estruturais:

- recriar páginas muito parecidas para a mesma query;
- criar múltiplos artigos para a mesma intenção principal;
- trocar slug compulsivamente sem ganho claro de arquitetura;
- usar `canonical` como muleta para corrigir duplicidade que deveria ser resolvida na estrutura;
- reescrever tudo do zero quando a URL já tem função válida e pode ser consolidada.

### O que fazer quando surgir uma ideia de nova página

Antes de criar uma URL, responder estas 3 perguntas:

1. **Qual é a intenção principal exata?**
2. **Essa intenção já tem uma URL dona no site?**
3. **A nova página é realmente diferente em SERP, papel editorial e estágio do funil?**

Se a resposta da segunda pergunta for "sim", o padrão preferido é:

- **melhorar a URL existente**;
- **aprofundar conteúdo**;
- **reforçar interlinkagem**;
- ou **reposicionar/redirecionar** a página redundante.

### Como tratar canibalismo

Quando duas URLs começarem a disputar a mesma intenção:

1. eleger uma URL principal;
2. consolidar o que for útil nela;
3. redirecionar a URL redundante quando fizer sentido;
4. corrigir links internos;
5. atualizar títulos, H1 e description para reforçar a separação de papéis.

### Canonical: uso correto

`canonical` serve para **reforçar a URL canônica de uma página**, não para justificar a existência contínua de duas páginas mirando a mesma query.

Se houver disputa real de intenção, o tratamento preferido é **arquitetural**:

- consolidar;
- redirecionar;
- ou reposicionar a página secundária para outra intenção.

### Diretriz editorial moderna para o estágio atual

O crescimento do projeto deve priorizar:

- consolidação;
- profundidade;
- intenção correta;
- fortalecimento dos hubs principais;
- expansão só quando a nova URL atender uma intenção realmente distinta.

Evitar crescimento por "mais páginas aleatórias". Nesta fase, isso tende a diluir sinal mais do que ajudar.

## Acessibilidade e HTML semântico (impacto indireto em SEO)

- Link **“Pular para o conteúdo principal”** e `<main id="conteudo-principal">` no `BaseLayout`
- **Breadcrumbs** com `nav` e `aria-label="Navegação estrutural (breadcrumb)"` onde usados
- Herói da home: `<h1>` único com `aria-labelledby` na seção

## Checklist para nova página

1. Definir a **intenção principal** da página e confirmar que ela ainda não tem uma URL dona.
2. Definir `title` e `description` únicos e alinhados ao H1/conteúdo.
3. Garantir que a nova URL tenha papel distinto no cluster (hub, comparativo, review, editorial, etc.).
4. Se a página for estratégica para compartilhamento ou Google Discover: adicionar **`canonical`** + objeto **`openGraph`** (URL absoluta, imagem absoluta em formato adequado — ver páginas existentes).
5. Para artigos/reviews/guia: considerar **JSON-LD** coerente (`Article`, `BreadcrumbList`, `FAQPage` se houver FAQ visível na página).
6. Conteúdo em Markdown do blog: preencher `title`, `description`, `pubDate`, `category`; opcional `coverImage`, `updatedDate`, `faq`.
7. Manter **`site`** e URLs absolutas consistentes com `astro.config.mjs` após mudança de domínio.
8. Se a ideia da nova página colidir com uma URL existente, preferir **consolidar ou aprofundar** antes de criar uma nova rota.

## Lacunas conscientes (opcional evoluir)

- Várias páginas internas não definem **canonical** nem **Open Graph**.
- Não há **robots.txt** versionado; avaliar se deseja apontar explicitamente para `sitemap-index.xml` ou restringir rotas.
- A home acumula **FAQPage** do componente de FAQ; outras páginas sem FAQ não duplicam esse padrão.
