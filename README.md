# Casa Prática Eletro

Portal editorial de reviews, comparativos e guias de eletrodomésticos (foco atual: fogões), com links de afiliados. Site estático em [Astro](https://astro.build/) 6 + Tailwind 4.

**Domínio:** https://casapraticaeletro.com.br

**Responsabilidade deste arquivo:** estado atual da plataforma.  
Governança, princípios e evolução: `docs/ROADMAP-PLATAFORMA.md` (documento normativo).

---

## Visão geral

Site HTML pré-gerado (`output: 'static'`), Tailwind 4, content collections e inventário tipado de afiliados. Deploy típico na Vercel (`vercel.json`).

Fase 1 (Consolidação): encerrada. Detalhes e prioridades: ROADMAP.

---

## Arquitetura atual

| Camada | Onde | Papel |
|--------|------|--------|
| Site estático | `src/pages`, `layouts`, `components` | HTML, SEO, UI |
| Conteúdo | `src/content/blog`, `src/content/melhores` | Collections tipadas (Zod) |
| Dados | `src/data/` | Navegação, inventário, interlinks, blocos comerciais |
| Product Inventory | `src/data/products.ts` | URLs afiliadas (ML / Shopee) usadas pelo site e pelo monitor |
| Ops | `src/modules/affiliate-monitor/` | Saúde de links (CLI, fora do build) |

Menu público: **Início → Blog → Reviews → Sobre → Contato**.

---

## Estrutura do projeto

```text
casa-pratica-eletro/
├── docs/
├── public/images/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/blog/ | content/melhores/
│   ├── content.config.ts
│   ├── data/products.ts
│   ├── layouts/BaseLayout.astro
│   ├── modules/affiliate-monitor/
│   ├── pages/
│   ├── styles/global.css
│   └── utils/
├── package.json
└── astro.config.mjs
```

---

## Módulos existentes

- **Product Inventory** — `src/data/products.ts`
- **Affiliate Health Monitor** — `src/modules/affiliate-monitor/`
- **Blocos comerciais** — `src/data/commercialGuideBlocks.ts` + cards/tabela
- **Interlinkagem** — `src/data/editorialContent.ts` + `RelatedContent` / `SmartRecommendations` / `EditorialLinks`

Pendências adiadas (não são módulos novos): `docs/TECH-DEBT.md`.  
Visão de fases futuras: `docs/ROADMAP-PLATAFORMA.md`.

---

## Como executar

Requisito: Node `>=22.12.0`.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build
npm run preview
npm run check
npm test
```

### Affiliate Health Monitor

```bash
npm run monitor:affiliates
npm run monitor:affiliates -- --no-confirm
npm run monitor:affiliates -- --product=brastempBFS5NCR
```

Relatórios: `reports/affiliate-health/` (gitignored). Detalhes: `src/modules/affiliate-monitor/README.md`.

---

## Documentação disponível

| Documento | Conteúdo |
|-----------|----------|
| `README.md` | Estado atual (este arquivo) |
| `docs/ROADMAP-PLATAFORMA.md` | Documento normativo — governança e evolução |
| `docs/CHANGELOG.md` | Histórico |
| `docs/TECH-DEBT.md` | Decisões conscientemente adiadas |
| `docs/site-blueprint.md` | Mapa técnico do repositório |
| `docs/seo-rules.md` | Regras SEO |
| `docs/MANUAL_PAGINA_DECISAO.md` | Padrão editorial comercial |
| `docs/MANUAL_DESIGN_SYSTEM.md` | Design system |
| `docs/AUDITORIA-*.md` | Relatórios de auditoria (Fase 1) |
