# BIBLIOTECA VISUAL — Casa Prática Eletro

**Status:** SSOT permanente do patrimônio visual (Motor III)  
**Caminho canônico:** `docs/BIBLIOTECA_VISUAL.md`  
**Backlog operacional:** `docs/BACKLOG_PATRIMONIO_VISUAL.md`  
**Registry:** `src/data/visualAssetRegistry.ts`  
**Biblioteca Técnica:** `src/data/technicalLibrary.ts`  
**Specs:** `src/data/editorialImageSpecs.ts`  
**Critério de página:** `docs/MANUAL_DIRECAO_VISUAL.md`  
**DNA packshot:** `docs/MANUAL_DESIGN_SYSTEM.md` §6 / §6.1  

### Status Oficial — Biblioteca Técnica Visual

A arquitetura permanente da Biblioteca Técnica Visual está **estabelecida**.

Os ativos atualmente produzidos constituem a **1ª geração** do patrimônio visual do Casa Prática Eletro.

A partir desta fase, o trabalho deixa de ser experimental e passa a seguir um processo de **evolução incremental**, priorizando:

- consistência visual;
- reutilização entre páginas;
- padronização dos componentes;
- melhoria contínua da experiência do usuário;
- ampliação gradual da cobertura temática.

Novos ativos deverão seguir os princípios do Motor III e integrar a Biblioteca Técnica como patrimônio permanente do projeto.

### Princípio Fundamental

A Biblioteca Técnica **não** é uma coleção de imagens.

Ela é um **sistema editorial** composto por ativos técnicos reutilizáveis, desenvolvidos para:

- explicar conceitos;
- apoiar decisões de compra;
- aumentar a autoridade temática do Casa Prática Eletro.

Cada ativo deve poder ser utilizado em **múltiplas páginas** sem perder contexto ou exigir adaptações específicas para um único artigo.

Implicação operacional: não “criar imagem para este artigo”; acumular **ativos editoriais reutilizáveis** que aceleram crescimento consistente.

### Meta — Biblioteca Técnica v1.0

**Princípio de ritmo:** com a arquitetura estabilizada, **não expandir a biblioteca rápido demais**. É mais valioso uma 1ª geração **extremamente consistente** do que dezenas de ativos com estilos diferentes.

| Meta | Definição |
|------|-----------|
| **v1.0** | **20–30 ativos fundamentais**, todos com o **mesmo DNA visual**, reutilizados em dezenas de páginas |
| Depois de v1.0 | Expansão mais simples: cada novo ativo **herda** o padrão consolidado |
| Até lá | Preferir: limpar desvios (texto na arte), unificar pipeline/componente, wiring de reuso, v2 de masters — antes de abrir muitas lacunas novas |

Incorporar ativo novo só se reforçar o DNA da 1ª geração (ou for correção tipológica crítica). Quantidade sem consistência **não** conta para v1.0.

### Princípio permanente — ritmo do patrimônio

> **Aprofundar o DNA, não inflar o inventário.**

O patrimônio ganha valor por **qualidade**, **reutilização** e **coerência da coleção** — não por volume de arquivos.

**Teste de admissão (obrigatório):** todo novo ativo deve tornar a biblioteca **melhor** do que era antes da sua existência. Se só aumenta o inventário sem elevar consistência, reuso ou clareza tipológica — **não entra**.

### DNA visual de referência (1ª geração)

| ID | Papel | Tema | Status |
|----|-------|------|--------|
| **L06A** | Âncora DNA | Trempes: ferro fundido × aramada esmaltada | Incorporado · referência ativa |
| **L08A** | Âncora DNA | Interior de forno simples (lacuna L08) | **Designado** · arte ainda a produzir no DNA de L06A |

**Regra:** todo novo ativo Tipo B deve parecer da **mesma família** que L06A/L08A (estúdio editorial, fundo grafite, sem texto na arte, comparação tipológica clara, profundidade técnica equivalente).  

**L09A** permanece Incorporado, mas **não** é âncora de DNA até v2 alinhada a esse par (hoje tem texto bakeado / linguagem diferente).

### DNA — fotografia editorial (não render)

Os ativos devem parecer **fotografias editoriais de produtos reais**, e **não** renderizações perfeitas.

| Preferir | Evitar |
|----------|--------|
| Textura, micro-imperfeições, sombra de contato natural | Superfície “plástica” / HDR exagerado |
| Linguagem de revista técnica / estúdio de produto | Composição sintética óbvia (“imagem de IA”) |
| Neutralidade e credibilidade | Brilho publicitário / CGI impecável |

Objetivo: o leitor confia mais no que lembra fotografia de revista técnica do que no que parece totalmente gerado. Preserva a neutralidade tipológica sem sensação de artefacto sintético.

### Posição oficial — 1ª geração aprovada (lapidar, não recomeçar)

As imagens da Biblioteca Técnica foram **aprovadas como 1ª geração**. Não estamos substituindo o patrimônio; estamos **refinando-o**.

| Postura | Significado |
|---------|-------------|
| **Aprovado** | Conceitos e direção corretos (sistema técnico válido) |
| **Lapidar** | Evolução incremental de qualidade e DNA |
| **Não fazer** | Reabrir o gerador para refazer tudo — desperdício; a identidade já está nascendo |

Auditoria técnica (Motor III): o sistema está correto; o próximo passo é **profissionalizá-lo** — não recomeçar por comparação errada ou ativo inútil. Validação máxima em **L06A**: pedagogia visual (ensina e apoia decisão, não só ilustra).

#### Destino por ativo (1ª geração)

| ID | Decisão | Motivo | Ação |
|----|---------|--------|------|
| **L06A** | Manter · âncora DNA | Pedagogia visual; sem texto | Referência para todos os novos |
| **L08A** | Produzir no DNA de L06A | Segunda âncora (interior forno) | Arte ainda pendente |
| **L07A** | **Evoluir** | Excelente conceito | Perder o texto na arte (título/legenda só HTML) |
| **L09A** | **Evoluir** | Excelente conceito | Perder o texto/callouts; alinhar ao DNA L06A |
| **L05A** | **Incorporado** | Eixo único (tampo); sem texto | Wired em `/review-fogao-mesa-de-vidro-consul/` |
| **L06B** | Validar escopo | Complemento a L06A | Só se agregar sem destoar |

**Proibido:** campanha de regeneração em massa. Trabalho = lapidar a família.


No início, cada artigo exigia quase começar do zero. Com a Biblioteca Técnica, cada novo conteúdo pode herdar: componentes · blocos comparativos · ativos técnicos · padrões visuais · critérios editoriais.

Consequência: o **custo marginal** de conteúdo de alta qualidade tende a **diminuir** com o tempo, enquanto a **consistência aumenta** — efeito cumulativo típico de plataforma editorial técnica (não só site de afiliados).

### Ritual futuro — Biblioteca Técnica v2.0 (revisão de coleção)

Quando a **v1.0** estiver completa (20–30 ativos), fazer revisão de **conjunto**, não ativo por ativo:

1. Se eu ocultar os IDs, reconheço que todos pertencem à mesma biblioteca?
2. Todos têm a mesma linguagem visual?
3. Todos explicam conceitos com o mesmo nível de profundidade?
4. Existe algum ativo destoando da família?
5. Há lacunas importantes **antes** de criar novos temas?

Essa revisão de coerência da coleção costuma revelar mais do que auditar imagens isoladas. Só depois dela abrir expansão temática ampla (v2.0+).

## O que este documento é (e não é)

Este SSOT registra apenas informações **permanentes ou de longa duração** sobre o patrimônio visual.

| Pertence ao SSOT | Não pertence ao SSOT |
|------------------|----------------------|
| Quais ativos existem | Prioridade da semana / sprint |
| Onde estão (caminho) | “Vamos criar o tipológico X agora” |
| Onde são usados | Ranking operacional de produção |
| Classificação A/B + ficha de governança | Tarefas de wiring pontuais |
| Categorias / funções editoriais | Decisões editoriais temporárias |
| Mapa de reutilização (capacidade) | Fila de implementação |
| Lacunas de **tipo de ativo** (catálogo A/B) | “Próximo passo desta sprint” |
| Ciclo de vida do arquivo | |
| Padrões e desvios estruturais | |

Priorizações, sprints e recomendações de criação → `docs/BACKLOG_PATRIMONIO_VISUAL.md`.

Última sincronização de inventário: 2026-07-28.

---

## 0. Arquitetura

### Estrutura atual

```text
public/images/     → URLs estáveis (markdown, OG, cards)
src/assets/images/ → Picture / build Astro
Staging            → _src / _atlas_cands / .backup-originals / fontes na raiz
```

### Avaliação

| Critério | Nota | Achado |
|----------|------|--------|
| Pastas | Médio | Organiza por slug de página, não por função editorial |
| Nomes | Médio | Bons padrões (`{sku}`, `*-hero`, `corpo-*`); exceções (espaços, misturas PNG) |
| Localização | Médio | Depende deste SSOT; disco sozinho é lento por tema |
| Manutenção | Médio-baixo | Staging misturado; espelhos; órfãos; arquivos 0 KB |
| Crescimento | Médio | Dual public/assets correto; índice lógico necessário |

### Princípios de arquitetura (permanentes)

Manter dualidade public/assets; índice lógico = este doc + registry; staging fora do conjunto canônico de reuso; novos ativos nomeados por **função** (`corpo-comparativo-embutir-vs-piso.webp`). Reorganização física de pastas só com decisão explícita.

**Biblioteca Técnica (Tipo B):** masters em `src/assets/images/library/LXXA.webp` + espelho público `/images/library/` quando Incorporado. Índice tipado: `src/data/technicalLibrary.ts`. Componente: `TechnicalFigure.astro` / `ArticleTechnicalFigure.astro`.

### 0.1 Classificação do patrimônio — Tipo A × Tipo B

**Objetivo do Motor III:** patrimônio organizado, escalável e reutilizável — não produção de imagens em si.

| | **Tipo A — Editorial (contextual)** | **Tipo B — Técnico (reutilizável)** |
|--|-------------------------------------|-------------------------------------|
| Função | Contextualiza narrativa de página | Explica critério técnico de compra |
| Valor | Alto na URL dona; baixo reuso | Alto no acervo; multi-página / multi-ano |
| Pertence a | Uma história / URL | Casa Prática Eletro |
| Exemplos | Embutir×piso no ambiente; cozinha compacta; gourmet; pessoa cozinhando; limpeza; uso cotidiano | Trempes; queimadores; mesa vidro×inox; acabamentos; forno; grades; esmaltação; segurança; componentes |
| Pode substituir? | Sim, sem afetar identidade do acervo técnico | Não sem replanejamento do patrimônio |
| Objetivo | Experiência editorial | Patrimônio visual permanente |

**Fora do eixo A/B:** packshots de SKU (ativos comerciais, sob demanda de URL review/hub).

**Prioridade permanente:** Tipo B > Tipo A. Contextual só quando agregar valor claro e **não** competir com técnico na fila.

#### Escala de potencial de reutilização

| Nível | URLs estimadas |
|-------|----------------|
| Baixo | 1–2 |
| Médio | 3–10 |
| Alto | 11–30 |
| Patrimônio | >30 |

#### Governança obrigatória (ficha por ativo)

Todo ativo **novo** (e, progressivamente, cada canônico no inventário) registra:

| Campo | Valores / notas |
|-------|-----------------|
| Categoria | Editorial (A) · Técnico (B) · Comercial (SKU) |
| Potencial de reutilização | Baixo · Médio · Alto · Patrimônio |
| Expectativa de vida útil | Curta (≤1 ano) · Média (1–3) · Longa (3–5+) · Permanente |
| Páginas atuais | URLs que já usam |
| Páginas futuras previstas | Cluster / URLs candidatas |
| Responsável pela aprovação | Humano (nome/papel) |
| Status de governança | Planejado · Produzido · Validado · Incorporado |

Backfill do inventário histórico: gradualmente. **Lacunas e novos ativos já entram classificados.**

---

## 1. Inventário completo

**Totais em disco:** 119 arquivos de imagem.  
**Canônicos (fora de staging explícito):** 66.  
**Staging / fonte / backup:** 53.

### 1.1 Legenda

| Campo | Valores |
|-------|---------|
| Função | Hero · Packshot · Review · Comparativo · Lifestyle · Forno · Medidas · Logo · Thumb · Staging · Outros |
| Reuso | Alto · Médio · Baixo · Nulo |
| Life | ATIVO · REUTILIZÁVEL · SUBUTILIZADO · OBSOLETO · CANDIDATO |

Specs-alvo: packshot ~1254² · hero guia/article ~1280×800 · thumb ~1200×750.

### 1.2 Canônicos — inventário

| Arquivo | Caminho | Res | KB | Fmt | Função | Onde aparece | Reuso | Life |
|---------|---------|-----|----|-----|--------|--------------|-------|------|
| brastemp-bfs5ncr-blog-premium | public/images/blog/ | 1024² | 42 | webp | Packshot legado | Sem wiring claro (duplica review) | Nulo | CANDIDATO |
| consul-cfs5nab-blog-premium | public/images/blog/ | 1024² | 51 | webp | Packshot legado | Idem | Nulo | CANDIDATO |
| electrolux-fe5ig-blog-premium | public/images/blog/ | 1024² | 41 | webp | Packshot legado | Idem | Nulo | CANDIDATO |
| corpo-fogao-4-bocas-cozinha-compacta-moderna | …/fogao-4-bocas-ainda-vale-a-pena/ | 1024×640 | 63 | webp | Lifestyle | Blog 4b; comparativo 4×5; OG | Alto | REUTILIZÁVEL |
| corpo-comparativo-cooktop-fogao-piso | …/fogao-5-bocas-reduz-espaco-cozinha/ | 901×600 | 100 | webp | Comparativo | Blog espaço | Médio | ATIVO |
| corpo-cozinha-corredor-fogao-5-bocas-estreita | idem | 914×600 | 90 | webp | Lifestyle | Blog espaço; comparativo 4×5 | Alto | REUTILIZÁVEL |
| corpo-cozinha-corredor-fogao-5-bocas | idem | 960×600 | 45 | webp | Lifestyle | — | Alto | SUBUTILIZADO |
| hero reduz espaço na cozinha | public/images/blog/ | 1200×800 | 110 | webp | Hero legado | Nome irregular; espelho | Nulo | OBSOLETO |
| corpo-fogao-forno-duplo-cozinha-editorial | …/melhor-fogao-com-forno-duplo/ | 1920×1280 | 195 | webp | Lifestyle/Forno | — | Médio | SUBUTILIZADO |
| corpo-fogao-forno-duplo-cozinha-verde | idem | 607×455 | 58 | png | Lifestyle/Forno | Blog forno duplo | Médio | ATIVO |
| corpo-fogao-forno-duplo-fornos-paralelos | idem | 607×455 | 66 | png | Forno | Blog forno duplo | Alto | REUTILIZÁVEL |
| corpo-fogao-forno-duplo-gabarito-medidas | idem | 1920×1280 | 35 | webp | Medidas | Blog forno duplo | Alto* | REUTILIZÁVEL |
| logo-casa-pratica-eletro-header.png | public/images/logo/ | 1024×455 | 33 | png | Logo | Header | — | ATIVO |
| logo-casa-pratica-eletro-header.webp | idem | 1024×455 | 13 | webp | Logo | Header | — | ATIVO |
| logo-casa-pratica-eletro.webp | idem | 1000×455 | 12 | webp | Logo | Footer | — | ATIVO |
| atlas-monaco-plus-hero | melhores/4-bocas | 1280×800 | 119 | webp | Hero/Mesa inox | Hub 4b justificativas | Médio | ATIVO |
| atlas-monaco-plus | idem | 1254² | 40 | webp | Packshot | Hub cards; /fogao-atlas-e-bom/ | Médio | ATIVO |
| consul-cf04nar-hero | idem | 1280×800 | 108 | webp | Hero/Mesa inox | Hub; blog vidro/inox | Alto | REUTILIZÁVEL |
| consul-cf04nar | idem | 1254² | 30 | webp | Packshot | Hub cards | Médio | ATIVO |
| electrolux-fe4iw-hero | idem | 1280×800 | 105 | webp | Hero/Mesa inox | Hub 4b | Médio | ATIVO |
| electrolux-fe4iw | idem | 1254² | 28 | webp | Packshot | Hub cards | Médio | ATIVO |
| melhor-fogao-4-bocas-2026 | public + assets/heroes | 1280×800 | 70 | webp | Hero | Hub 4b cover | Médio | ATIVO |
| brastemp-bfs5ncr-hero | melhores/5-bocas | 1024² | 20 | webp | Hero | Hub 5b | Médio | CANDIDATO† |
| brastemp-bfs5ncr | idem | 1254² | 56 | webp | Packshot | Hub; home card espelho | Médio | ATIVO |
| consul-cfs5nab-hero | idem | 1024² | 51 | webp | Hero | Hub 5b | Médio | CANDIDATO† |
| consul-cfs5nab | idem | 1254² | 61 | webp | Packshot | Hub | Médio | ATIVO |
| cozinha-moderna-fogao-inox-luz-natural | idem | 1200×750 | 77 | webp | Lifestyle | cardImage hub 5b | Médio | REUTILIZÁVEL |
| electrolux-fe5ig-hero | idem | 1024² | 41 | webp | Hero | Hub 5b | Médio | CANDIDATO† |
| electrolux-fe5ig | idem | 1254² | 54 | webp | Packshot | Hub; home | Médio | ATIVO |
| melhores-fogoes-5-bocas-hero | public + assets/heroes | 1000² | 70 | webp | Hero | Home; hub 5b | Alto | ATIVO |
| atlas-atenas-glass-hero | melhores/mesa-vidro | 1600×1000 | 95 | webp | Hero/Mesa vidro | Hub; blog seguro | Alto | REUTILIZÁVEL |
| atlas-atenas-glass | idem | 1254² | 17 | webp | Packshot | Hub; /fogao-atlas-e-bom/ | Médio | ATIVO |
| brastemp-bfo4vae-hero | idem | 1600×1000 | 106 | webp | Hero/Mesa vidro | Hub; blog vale a pena | Alto | REUTILIZÁVEL |
| brastemp-bfo4vae | idem | 1254² | 25 | webp | Packshot | Hub | Médio | ATIVO |
| consul-cfo4var-hero | idem | 1600×1000 | 100 | webp | Hero/Mesa vidro | Hub; blog vidro/inox | Alto | REUTILIZÁVEL |
| consul-cfo4var | idem | 1254² | 22 | webp | Packshot | Hub | Médio | ATIVO |
| melhor-fogao-mesa-de-vidro-2026 | public + assets/heroes | 1600×1000 | 78 | webp | Hero | Hub vidro | Médio | ATIVO |
| brastemp-bfs5ncr-review-premium | public/reviews/ | 1024² | 20 | webp | Review | Review; vale a pena; OG fallback | Médio | ATIVO |
| consul-cfs5nab-review-premium | idem | 1024² | 51 | webp | Review | Review consul | Médio | ATIVO |
| electrolux-fe5ig-review-premium | idem | 1024² | 41 | webp | Review | Review electrolux | Médio | ATIVO |
| cozinha card blog | assets/blog/analise/ | 1200×750 | 35 | webp | Outros | — | Nulo | OBSOLETO |
| fogao-mesa-de-vidro-ou-inox-article-hero | assets/…/comparativos/ | 1125×750 | 202 | webp | Hero | Blog article | Baixo | ATIVO |
| fogao-mesa-de-vidro-ou-inox-blog-premium | idem | 1125×750 | 191 | webp | Thumb | Listagem blog | Baixo | ATIVO |
| electrolux-cozinha-hero-premium | assets/blog/ | 1024×768 | 135 | png | Lifestyle | — | Médio | SUBUTILIZADO |
| fogao-4-bocas-ainda-vale-a-pena-article-hero | assets/…/guias/ | 1024×640 | 63 | webp | Hero | Blog article | Baixo | ATIVO |
| fogao-4-bocas-ainda-vale-a-pena-blog-premium | idem | 1024×640 | 86 | png | Thumb | Listagem | Baixo | ATIVO |
| fogao-5-bocas-reduz-espaco-…-article-hero | idem | 1200×800 | 110 | webp | Hero | Blog article | Baixo | ATIVO |
| fogao-5-bocas-reduz-espaco-…-blog-premium | idem | 1200×800 | 110 | webp | Thumb | Listagem | Baixo | ATIVO |
| guia-fogao-embutir-ou-de-piso-article-hero | idem | 1024×640 | 110 | png | Hero | Blog (só hero) | Baixo | ATIVO |
| guia-fogao-embutir-ou-de-piso-blog-premium | idem | 1200×750 | 61 | webp | Thumb | Listagem | Baixo | ATIVO |
| melhor-fogao-5-bocas-blog-premium | idem | 1200×751 | 57 | webp | Thumb | Glob/legado | Baixo | SUBUTILIZADO |
| melhor-fogao-com-forno-duplo-article-hero | idem | 683×455 | 25 | png | Hero | Blog | Baixo | CANDIDATO‡ |
| melhor-fogao-com-forno-duplo-blog-premium | idem | 683×455 | 69 | png | Thumb | Listagem | Baixo | CANDIDATO‡ |
| fogao-mesa-de-vidro-seguro-article-hero | assets/…/reviews/ | 1024×682 | 125 | png | Hero | Blog | Baixo | ATIVO |
| fogao-mesa-de-vidro-seguro-blog-premium | idem | 1024×682 | 131 | png | Thumb | Listagem | Baixo | ATIVO |
| review-fogao-com-mesa-de-vidro-article-hero | idem | 1024×640 | 112 | png | Hero | Blog | Baixo | ATIVO |
| review-fogao-com-mesa-de-vidro-blog-premium | idem | 1024×768 | 125 | png | Thumb | Listagem | Baixo | ATIVO |
| *-card-premium (3) | assets/cards/ | 1254² | 54–61 | webp | Packshot (cópia) | Pipeline | Nulo | SUBUTILIZADO |
| *-card-premium (3) optimized | assets/cards/optimized/ | 1254² | 54–61 | webp | Packshot | Home; hub 5b | Médio | ATIVO |

\* Reuso alto **no tema medidas/forno duplo**; não generaliza vão 4b/5b.  
† Heroes 5b em 1:1 vs 16:10 nos hubs 4b/vidro.  
‡ Abaixo do spec de article hero (~1280×800).

### 1.3 Staging — inventário completo (não usar em produção)

| Arquivo | Caminho | Res | KB | Fmt |
|---------|---------|-----|----|-----|
| brastemp-source.png | public/images/ | 1024² | 80 | png |
| source-fogao-electrolux-76usq.png | public/images/ | 600² | 12 | png |
| atlas-157894…157910 + soft/backup/lineage (20) | …/4-bocas/_atlas_cands/ | 1200²–1254² | 27–701 | png/webp |
| atlas/brastemp/consul *_src (26) | …/mesa-de-vidro/_src/ | variado; **vários 0 KB** | 0–155 | png/jpg/webp |
| brastemp-bfs5ncr-review-premium-original | reviews/_src/ | 1024² | 42 | webp |
| *-card-premium (3) | cards/.backup-originals/ | 1254² | 1634–1755 | webp |

**Life staging:** OBSOLETO para páginas · **Reuso:** Nulo · **Função:** produção interna apenas.

---

## 2. Biblioteca organizada (por função editorial)

| Função | Estoque atual (canônico) | Observação |
|--------|--------------------------|------------|
| **Hero** | Covers Melhores; article-heroes; home 5b | Heterogêneo (1:1 vs 16:10; PNG/WebP) |
| **Review** | 3× review-premium (só 5 bocas) | Sem 4b/vidro |
| **Packshot** | 9 hub SKUs + 3 cards optimized | DNA §6.1 coerente |
| **Comparativo** | 1 (cooktop×piso) | Não cobre embutir×piso nem 4×5 mesa |
| **Detalhe técnico** | — | Vazio |
| **Painel** | — | Vazio |
| **Mesa de vidro** | 3 heroes + 3 packshots hub | Forte em lifestyle produto |
| **Mesa inox** | Heroes 4b/5b + packshots | Forte; close-up ausente |
| **Queimadores** | — | Vazio |
| **Forno** | 3–4 corpos forno duplo | Só duplo; interior simples ausente |
| **Instalação** | Parcial (cooktop×piso) | Embutir×piso ausente |
| **Medidas** | 1 gabarito forno duplo | Gabaritos 4b/5b/embutir ausentes |
| **Lifestyle** | Compacta, corredor, cardImage, ociosos | Bom núcleo de espaço/rotina |
| **Infográfico** | = Medidas (gabarito) | Um ativo |
| **Thumb** | *-blog-premium por post | Cobertura de listagem ok |
| **Logo** | 3 arquivos | Ok |
| **Staging** | 53 arquivos | Fora da biblioteca de reuso |

---

## 3. Mapa de reutilização

### 3.1 Já em múltiplas URLs

| Ativo | Já usado em | Ainda pode (função preservada) |
|-------|-------------|-------------------------------|
| Heroes mesa vidro (3) | Hubs + blogs vidro | Futuros satélites de acabamento |
| consul-cf04nar-hero | Hub 4b + vidro/inox | Blocos de modelo 4b (se houver) |
| Corpo cozinha compacta 4b | Blog + comparativo 4×5 | Checklist 4b **só** se ilustrar planta |
| Corpo corredor estreito | Blog + comparativo 4×5 | Cluster espaço / 5b |
| Packshots 5b / cards | Home, hub, reviews | Satélites 5b com modelos |
| Fornos paralelos / gabarito | Blog forno duplo | Menções honestas a forno/medidas |

### 3.2 Existe e ainda não está ligado

| Ativo | Função possível | Onde faria sentido |
|-------|-----------------|-------------------|
| corpo-cozinha-corredor-fogao-5-bocas.webp | Lifestyle vão | Blog espaço (variante) |
| corpo-fogao-forno-duplo-cozinha-editorial.webp | Lifestyle forno | Blog forno duplo |
| electrolux-cozinha-hero-premium.png | Lifestyle | Requer validação visual vs heroes existentes antes de qualquer ligação |
| cozinha-moderna-fogao-inox-luz-natural.webp | Lifestyle inox | Textos inox com baixa cobertura |

### 3.3 Não substitui lacuna

| Ativo | Não usar como |
|-------|----------------|
| cooktop × piso | Embutir × piso |
| Packshot SKU A | “Prova” de SKU B |
| Qualquer staging / 0 KB | Produção |
| Lifestyle genérico | Checklist sem ganho de compreensão |

### 3.4 Páginas × necessidade visual (diagnóstico)

| Grupo | URLs | Visual hoje | Lacuna de função? |
|-------|------|-------------|-------------------|
| Hubs Melhores | 3 | Packshot+hero+justificativas | Detalhe técnico tipológico |
| Reviews 5b | 3 (+ vale a pena) | Packshot | Detalhe forno/trempes/queimadores |
| Comparativo 4×5 | 1 | Lifestyle espaço (reuso) | Vista superior 4×5 |
| Comparativo vidro/inox | 1 | 2 heroes tampo | Close-up material / split |
| Guia embutir/piso | 1 | Hero + corpo L01 (Tipo A) | IMG02/03 opcionais (diagrama / apartamento) |
| Blogs espaço/4b/forno/vidro | 5 | Corpos presentes | Pontuais (ociosos) |
| Como escolher ×2 | 2 | Sem corpo | Medidas / técnico (não decorativo) |
| Custo-benefício ×2 | 2 | Sem corpo | Só se bloco de modelos (packshot) |
| Institucional / listagens | vários | OG/thumbs | Não |

---

## 4. Lacunas completas

Catálogo de **tipos de ativo inexistentes** (ou inexistentes de forma honesta), classificados A/B.  
Ranking e fila de produção → `docs/BACKLOG_PATRIMONIO_VISUAL.md` (**Tipo B antes de A**).

| ID | Ativo inexistente | Tipo | Reuso est. | Motivo | Benefício |
|----|-------------------|------|------------|--------|-----------|
| L01 | Comparativo embutir × piso (mesmo ambiente) | **A** Editorial | Baixo–Médio | **Incorporado** no guia (`corpo-comparativo-embutir-vs-piso.webp`); cooktop≠embutir | Contextualiza formato de instalação |
| L02 | Vista superior 4 bocas × 5 bocas | **B** Técnico | Médio | Comparativo cobre vão, não a mesa | Simultaneidade de panelas |
| L03 | Close-up tampo vidro | **B** Técnico | Médio–Alto | Heroes mostram produto inteiro | Material, limpeza, risco |
| L04 | Close-up tampo inox | **B** Técnico | Médio–Alto | Simétrico a L03 | Comparação de acabamento |
| L05 | Split tampo vidro × inox (uma arte) | **B** Técnico | Médio | **L05A Incorporado** (sem texto; eixo tampo) · review CFO4VAR | Comparação imediata / OG |
| L06 | Tipologia de trempes | **B** Técnico | Alto | **Incorporado L06A** (`library/L06A.webp`) | Decisão técnica no funil |
| L07 | Tipologia de queimadores | **B** Técnico | Alto | L07A em staging (texto na arte) | Explica diferenças de ranking |
| L08 | Interior de forno simples (1 cavidade) | **B** Técnico | Médio–Alto | **Âncora DNA L08A** (designada; arte pendente no DNA de L06A) | Critério forno |
| L09 | Painel / botões / acendimento | **B** Técnico | Médio | Ausente | UX do dia a dia |
| L10 | Gabarito medidas fogão 4 bocas | **B** Técnico | Médio | Só gabarito forno duplo | Evita erro de vão |
| L11 | Gabarito medidas fogão 5 bocas | **B** Técnico | Médio | Idem | Idem |
| L12 | Gabarito / folgas embutir | **B** Técnico | Baixo–Médio | Ausente | Instalação segura |
| L13 | Packshot review-premium 4 bocas (SKUs) | Comercial | Sob demanda | Reviews/`productImages` só 5b | Escala de reviews/OG |
| L14 | Packshot review-premium mesa de vidro (SKUs) | Comercial | Sob demanda | Idem | Idem |
| L15 | Detalhe grades / estabilidade de panela | **B** Técnico | Médio | Ausente | Critério prático |
| L16 | Comparativo forno simples × duplo (visual) | **B** Técnico | Médio | **Incorporado L09A** (`library/L09A.webp`; texto na arte = desvio) | Decisão de forno |
| L17 | Lifestyle cozinha planejada com embutir | **A** Editorial | Baixo | Arte dedicada / narrativa | Credibilidade de cenário |

### 4.1 Cobertura por tipo de página

| Tipo | Cobertura | Qualidade | Lacunas que mais afetam |
|------|-----------|-----------|-------------------------|
| Money pages | Alta | Alta (packshot) | **B:** L06 L07 L08 |
| Reviews | Média-alta | Boa no produto | **B:** L06 L07 L08 L09 |
| Comparativos | Média-alta | Boa lifestyle | **B:** L02 L03 L04 L05 · **A:** L01 |
| Guias/checklists | Baixa | — | **B:** L10 L11 L06 |
| Custo-benefício | Baixa | — | Comercial + **B:** L07 |
| Blog | Desigual | Mista | **A:** L01 · ociosos no mapa de reuso |
| Institucional | Baixa OK | — | — |

### 4.2 Ciclo de vida — síntese

| Status | Qtd aproximada | Exemplos |
|--------|----------------|----------|
| ATIVO | maioria dos canônicos em uso | Packshots hubs, heroes ligados, logos |
| REUTILIZÁVEL | ~10 | Heroes vidro; corpos 4×5; fornos paralelos |
| SUBUTILIZADO | ~6 | Corredor não-estreito; forno editorial; cards não-optimized; thumbs fracos |
| OBSOLETO | ~5+ | Hero com espaço no nome; órfão analise/; staging morto |
| CANDIDATO | ~10 | Heroes 5b 1:1; PNG forno baixos; duplicatas blog packshot |

### 4.3 Padronização — desvios observados

- Proporção hero 5b (1:1) ≠ 4b/vidro (16:10).  
- Article/thumb forno duplo 683×455 < spec.  
- Mistura PNG/WebP em heroes de blog.  
- Duplicatas: `public/blog/*-blog-premium` ≈ `reviews/*`; covers Melhores espelhados em `assets/heroes`.  
- Staging com 0 KB e backups >1,5 MB misturados à árvore.

## Relação com outros documentos

| Artefato | Papel |
|----------|--------|
| **Este arquivo** | **SSOT permanente** (existência, localização, uso, classificação A/B, governança, lacunas) |
| `docs/BACKLOG_PATRIMONIO_VISUAL.md` | Backlog **operacional** (ranking, sprints, tarefas, recomendações) |
| `src/data/visualAssetRegistry.ts` | Índice tipado auxiliar |
| `src/data/editorialImageSpecs.ts` | Specs de export |
| `src/data/productImages.ts` | Reviews 5 bocas |
