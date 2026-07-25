# Auditoria SSOT — links afiliados vs Product Inventory

**Data:** 2026-07-24  
**Escopo:** varredura estática em `src/` por URLs ML/Shopee.  
**Ação desta manutenção:** **somente relatório**. Nenhum link, CTA ou parâmetro foi alterado.

**Fonte autorizada:** `src/data/products.ts` (`produtos`).

---

## Resumo

| Categoria | Qtd. de ocorrências de URL | Ação |
|-----------|----------------------------|------|
| Canônicas no inventário | 18 (9 SKUs × ML + Shopee) | OK — SSOT |
| Hardcoded em Markdown (produção) | 12 | Reportado — decisão humana |
| Consumo via `produtos.*` em `.astro`/`.ts` | várias | OK — conforme SSOT |
| Fixtures de teste | várias | Ignorar (não são CTAs) |

Nenhum href afiliado hardcoded foi encontrado em **componentes** `.astro` ou **páginas** `.astro` fora do inventário: páginas/componentes comerciais usam `produtos.*` ou props derivadas de `commercialGuideBlocks` (que lê `products.ts`).

---

## Achados — Markdown (duplicata do inventário)

Todos os links abaixo **coincidem** com o valor atual em `products.ts` (cópia literal, não URL órfã). O problema é **duplicação de fonte**, não URL divergente hoje.

### `src/content/melhores/_melhor-fogao-4-bocas-justificativas.md`

| Linha | Link | SKU inventário | Motivo | Recomendação (após aprovação) | Confiança |
|------:|------|----------------|--------|-------------------------------|-----------|
| ~23 | `https://meli.la/1mrHBpJ` | `consulCF04NAR.ml` | CTA com href literal; não referencia `produtos.*` | Substituir por consumo do inventário (ex.: bloco Astro / shortcode / render via `commercialGuideBlocks`) — **sem mudar a URL** | Alta |
| ~24 | `https://shopee.com.br/Fog%C3%A3o-de-Piso-4-Bocas-Consul-CFO4NAR-...` | `consulCF04NAR.shopee` | Idem | Idem | Alta |
| ~42 | `https://meli.la/2SNgQnU` | `electroluxFE4IW.ml` | Idem | Idem | Alta |
| ~43 | `https://s.shopee.com.br/5VThxEhHjk` | `electroluxFE4IW.shopee` | Idem | Idem | Alta |
| ~59 | `https://meli.la/2x9CLkK` | `atlasMonacoPlus.ml` | Idem | Idem | Alta |
| ~60 | `https://s.shopee.com.br/1VxZCI4Dcy` | `atlasMonacoPlus.shopee` | Idem | Idem | Alta |

Comentários no arquivo já apontam o inventário (`<!-- CTAs: produtos.… -->`), o que confirma intenção SSOT sem enforcement técnico.

### `src/content/melhores/_melhor-fogao-mesa-de-vidro-justificativas.md`

| Linha | Link | SKU inventário | Motivo | Recomendação (após aprovação) | Confiança |
|------:|------|----------------|--------|-------------------------------|-----------|
| ~23 | `https://meli.la/1w6gKzF` | `consulCFO4VAR.ml` | CTA com href literal | Consumir inventário; preservar URL | Alta |
| ~24 | `https://shopee.com.br/product/1541325700/22294431199` | `consulCFO4VAR.shopee` | Idem | Idem | Alta |
| ~42 | `https://meli.la/2oF53cc` | `brastempBFO4VAE.ml` | Idem | Idem | Alta |
| ~43 | `https://shopee.com.br/Fog%C3%A3o-4-Bocas-Brastemp-BFO4VAE-...` | `brastempBFO4VAE.shopee` | Idem | Idem | Alta |
| ~61 | `https://meli.la/1LpAT6R` | `atlasAtenasGlass.ml` | Idem | Idem | Alta |
| ~62 | `https://shopee.com.br/Fog%C3%A3o-4-Bocas-Preto-com-Mesa-de-Vidro-Atlas-...` | `atlasAtenasGlass.shopee` | Idem | Idem | Alta |

---

## Conformes (não são drift)

| Local | Observação | Confiança |
|-------|------------|-----------|
| `src/data/products.ts` | Definição canônica | Alta |
| `src/data/commercialGuideBlocks.ts` | Lê `produtos.*` | Alta |
| `HomeTopProducts.astro`, `HomeComparisonTable.astro` | Lê `produtos.*` | Alta |
| Páginas satélite / reviews (`brastemp-…`, `review-fogao-…`, `como-escolher-…`, `fogao-5-bocas-custo-beneficio.astro`) | `href={produtos.…}` / props | Alta |
| `src/modules/affiliate-monitor/**` | Consome inventário via plugins; URLs em testes são fixtures | Alta |
| `src/utils/mercadoLivreAffiliate.test.ts` | Fixtures sintéticas (não CTAs do site) | Alta |

---

## Fora de escopo / não sinalizado como CTA

- Domínios ML/Shopee só em strings de host (`collectors/*`, `mercadoLivreAffiliate.ts`).
- Nenhum link afiliado em `src/content/blog/*.md`.

---

## Risco operacional

Enquanto os 12 hrefs permanecerem no Markdown, **rotacionar uma oferta exige editar inventário + fragmentos**. Hoje os valores batem com `products.ts`; o risco é **divergência futura**, não quebra atual.

**Próximo passo:** aprovação humana para um plano de correção (sem alterar URLs na primeira passagem).
