# MANUAL SEO – CASA PRÁTICA ELETRO

**Status:** documentação permanente (estrutura oficial)  
**Caminho canônico:** `docs/MANUAL_SEO.md`

### Como usar

1. Consulte este manual ao criar ou ajustar páginas públicas (metadados, headings, links, sitemap).
2. Quando uma regra de SEO mudar, **atualize este arquivo** — não crie versões paralelas.
3. Novos padrões devem ser incorporados nas seções abaixo.

**Fonte técnica atual (detalhada):** `docs/seo-rules.md` — consolidar progressivamente o conteúdo aqui.

Documentação relacionada: `MANUAL_PAGINA_DECISAO.md`, `PADROES_DE_COMPONENTES.md`, `REGRA_CRIACAO_URLS.md`, `CHANGELOG.md`.

---

## 1. Objetivo

Garantir consistência de descoberta, indexação e rich results sem conflitar com a arquitetura estável do site.

---

## 2. Infraestrutura

<!-- Incorporar: site URL, sitemap, robots, output estático. Ver seo-rules.md → Infraestrutura. -->

- [ ] URL canônica do domínio
- [ ] Sitemap
- [ ] Regras de rastreamento
- [ ] Ambiente de build estático

---

## 3. Metadados por página

<!-- title, description, canonical, Open Graph, Twitter. -->

- [ ] Title
- [ ] Meta description
- [ ] Canonical
- [ ] Open Graph / Twitter

---

## 4. Structured data (JSON-LD)

<!-- Article, FAQPage, BreadcrumbList, Organization, etc. -->

- [ ] Tipos permitidos por tipo de página
- [ ] FAQ apenas quando houver FAQ real no frontmatter/UI

---

## 5. Headings e conteúdo

- Hierarquia H1 → H2 → H3 coerente com o template
- Em Páginas de Decisão: seguir também `MANUAL_PAGINA_DECISAO.md`
- Não keyword stuffing; priorizar intenção de busca e clareza

---

## 6. Links internos e clusters

- Clusters por tema (ex.: fogão 4/5 bocas)
- Guias afiliados apontam para satélites; satélites não duplicam o ranking comercial

---

## 7. Imagens e performance SEO

- Alt text descritivo
- Caminhos estáveis em `public/images/...` ou assets otimizados
- Não quebrar OG image ao editar conteúdo

---

## 8. Checklist SEO antes da publicação

- [ ] Title e description únicos
- [ ] Canonical correto
- [ ] H1 único alinhado à intenção
- [ ] FAQ/schema coerentes com o conteúdo visível
- [ ] Links internos do cluster
- [ ] Imagem OG válida

---

## 9. O que não fazer

- Não inventar rotas só para SEO
- Não alterar arquitetura global em tarefa de “melhoria SEO”
- Não duplicar o mesmo texto em várias URLs do cluster
- Não criar URL nova só porque a keyword é diferente ou tem volume alto (`docs/REGRA_CRIACAO_URLS.md`)

---

## 10. Criação de URLs (intenção, não keyword)

SSOT: `docs/REGRA_CRIACAO_URLS.md` · regra `.cursor/rules/criacao-urls-por-intencao.mdc`.

Antes de propor página nova: confirmar se uma URL existente já resolve a mesma decisão de compra (produtos, critérios, comparação). Se sim, fortalecer a existente.

Sequência: **Keyword → intenção → SERP → patrimônio existente → produtos → decisão → URL.**  
Nunca: **Keyword → volume alto → nova URL.**

---

## Notas de consolidação

Conteúdo detalhado ainda em `seo-rules.md`. Ao migrar um bloco para cá, atualize `CHANGELOG.md` e, se o legado ficar obsoleto, indique redirecionamento editorial no topo de `seo-rules.md`.
