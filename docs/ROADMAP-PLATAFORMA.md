# Roadmap de Evolução da Plataforma Editorial

**Casa Prática Eletro**

---

## Documento Normativo da Plataforma

Este documento é a **referência oficial** para a evolução arquitetural do Casa Prática Eletro.

Toda decisão relacionada a arquitetura, governança, princípios, critérios de implementação e evolução deverá ser **registrada neste documento**.

Os demais documentos apenas **referenciam** estas definições, evitando duplicações e divergências.

| Documento | Responsabilidade (única) |
|-----------|--------------------------|
| **`README.md`** | Estado atual |
| **`docs/ROADMAP-PLATAFORMA.md`** (este) | Governança e evolução (**normativo**) |
| **`docs/CHANGELOG.md`** | Histórico |
| **`docs/TECH-DEBT.md`** | Pendências deliberadamente adiadas |

Este roadmap lista **possibilidades**, não obrigações.  
Nenhum módulo deve ser construído só porque aparece aqui.

Complementos técnicos (não normativos): `docs/site-blueprint.md`, `docs/seo-rules.md`, `src/modules/affiliate-monitor/README.md`.  
Auditorias (relatório): `docs/AUDITORIA-SSOT-AFILIADOS.md`, `docs/AUDITORIA-COMPONENTES-ORFAOS.md`.

**Status:** Fase 1 (Consolidação) **encerrada e aprovada** (2026-07-24).  
Documentação arquitetural da Fase 1 **definitiva** — não criar novos documentos de arquitetura sem necessidade operacional concreta.

**Prioridade absoluta até nova necessidade operacional:** produção de conteúdo · crescimento do catálogo · SEO · monitoramento operacional · evolução do negócio.

---

## Princípios permanentes

**Fonte única.** Não replicar esta lista em outros documentos — apenas referenciar.

1. **Hoje apenas o necessário. Amanhã sem reescrever.**
2. **A arquitetura existe para servir ao conteúdo, e não o contrário.**
3. Toda evolução deve nascer de uma **necessidade operacional real**.
4. Sempre preferir **simplificar** à **complexificar**.
5. Quando houver dúvida entre implementar ou aguardar, **preferir aguardar**.

---

## Filosofia da Plataforma

- Plataforma editorial orientada por dados.
- Dados estruturados alimentam o conteúdo; **não substituem** o julgamento editorial.
- Automação reduz trabalho repetitivo; **não** reduz qualidade editorial.
- Decisão final de publicação permanece **humana**.

### Perguntas obrigatórias antes de qualquer módulo

| # | Pergunta |
|---|----------|
| 1 | Qual problema resolve? |
| 2 | Quando ele realmente passa a ser necessário? |
| 3 | Qual **métrica** indica que chegou o momento? |
| 4 | O que pode continuar **manual** até lá? |
| 5 | Como **reutiliza** os módulos existentes? |
| 6 | Como evitar **overengineering**? |

Se (2) e (3) forem vagos (“seria legal ter”), **não implementar**.

---

## Política Permanente de Governança

(Política de evolução da plataforma.)

Toda nova proposta deverá seguir este fluxo:

1. Existe um problema operacional **real**?
2. O problema é **recorrente**?
3. Existe benefício **mensurável**?
4. Já está previsto no ROADMAP?
5. A implementação **aumenta** ou **reduz** a complexidade?
6. O benefício supera o **custo permanente** de manutenção?

Se **qualquer** resposta for negativa (ou se a complexidade aumentar sem ganho claro):

- **Registrar a ideia** (ex.: nota, `TECH-DEBT.md` ou discussão).
- **Não implementar.**

A simplicidade é um **requisito arquitetural** da plataforma.

Revisão arquitetural: a primeira pergunta é sempre *“Existe um problema operacional real?”* — se não, manter a implementação atual.  
Pendências já adiadas: `docs/TECH-DEBT.md`.  
Processo detalhado quando o gate passar: **Fluxo de Decisão para Novas Funcionalidades** (abaixo).

---

## Fluxo de Decisão para Novas Funcionalidades

> **Isto não é uma funcionalidade da plataforma.**  
> É uma **regra de governança do projeto**: processo humano obrigatório antes de qualquer implementação.  
> Não gera código, tela, CLI nem módulo — orienta *quando* e *se* algo entra no repositório.  
> Esse tipo de regra tende a permanecer útil por muitos anos, independentemente de quais módulos existam.

Toda nova funcionalidade **deverá** passar pelo processo abaixo **antes** de entrar no código — **após** o gate da **Política Permanente de Governança**.  
Ordem fixa: se uma etapa falhar, **parar** — não pular para a implementação.

### Etapa 1 — O problema existe?

A funcionalidade resolve um problema operacional real?

- **Não** → não implementar.

### Etapa 2 — O problema é recorrente?

É uma tarefa repetitiva ou uma necessidade permanente?

- **Não** → continuar fazendo manualmente.

### Etapa 3 — Já existe um módulo responsável?

A funcionalidade pode ser incorporada a um módulo existente?

- **Sim** → evoluir o módulo atual. Evitar criar novos módulos.

### Etapa 4 — Está alinhada ao ROADMAP?

A ideia faz parte da visão da plataforma (`ROADMAP-PLATAFORMA.md` + Critério de Entrada)?

- **Não** → justificar a inclusão **antes** de desenvolver (atualizar o roadmap só com necessidade comprovada).

### Etapa 5 — Mantém os princípios permanentes?

A solução respeita a seção **Princípios permanentes** e:

- reduz trabalho manual?
- evita duplicação?
- mantém baixo acoplamento?
- preserva a simplicidade?
- melhora a manutenção?

- **Não** → reavaliar (ou não implementar).

### Etapa 6 — Implementar

Somente após passar pelas etapas 1–5 a funcionalidade poderá entrar no código.

```text
Problema real? → Recorrente? → Cabe em módulo existente?
        → Alinhado ao roadmap? → Princípios OK? → Código
```

---

## Fonte Única da Verdade

Enquanto o projeto permanecer na arquitetura atual:

**`src/data/products.ts` é a única fonte autorizada** para:

- produtos
- identificadores
- marketplaces
- links afiliados
- categorias (quando modeladas no inventário)
- metadados básicos do catálogo comercial

### Regras obrigatórias

- Nenhum componente deve manter URLs afiliadas próprias.
- Nenhum artigo deve duplicar links de afiliados.
- Todos os CTAs devem consumir dados do catálogo (`produtos.*` / blocos derivados).
- Qualquer evolução futura deverá **preservar este princípio**.

### Estado real (Fase 1)

Páginas `.astro`, `commercialGuideBlocks.ts` e o Affiliate Health Monitor **consomem** `products.ts`.  
Exceção conhecida (drift documental, **não corrigida automaticamente**): hrefs literais nos fragmentos `_*-justificativas.md` dos guias Melhores — valores hoje iguais ao inventário, mas fonte duplicada. Relatório: `docs/AUDITORIA-SSOT-AFILIADOS.md`. Qualquer unificação exige **aprovação humana** e não deve alterar a URL no ar.

Caso exista no futuro um **Product Catalog** dedicado, ele **substitui** `products.ts` mantendo **exatamente a mesma responsabilidade**: continuar sendo a **única** fonte dos dados de produto e afiliação. Não pode haver duas fontes paralelas.

O Affiliate Health Monitor, Article Builder e demais módulos **consomem** essa fonte — não a substituem.

---

## Limites da Automação

Enquanto não houver necessidade operacional comprovada, **não automatizar**:

- escrita editorial
- opinião técnica
- análise crítica
- conclusão dos artigos
- recomendações finais
- decisão definitiva dos produtos escolhidos
- publicação automática

A IA / automação **pode**:

- gerar sugestões
- criar rascunhos e estruturas (skeletons)
- organizar dados
- detectar inconsistências
- estruturar conteúdo repetitivo (FAQ base, schema, tabelas a partir do catálogo)

Toda decisão editorial continua **humana**.

---

## Condição de Permanência dos Módulos

Todo módulo continua existindo **apenas** se gerar benefício operacional claro.

Deve justificar-se por **pelo menos um** dos benefícios:

- reduzir trabalho manual
- reduzir erros
- aumentar produtividade
- facilitar manutenção
- melhorar qualidade dos dados
- aumentar escalabilidade

Se deixar de cumprir esses objetivos, deve ser **simplificado**, **incorporado** por outro módulo ou **removido**.

A plataforma deve permanecer **enxuta**.

---

## Visão geral e estado atual

A plataforma é um site **Astro estático** com dados tipados, conteúdo em collections e módulos operacionais desacoplados da UI.

Objetivo de longo prazo: crescer de dezenas para milhares de produtos, centenas de artigos e múltiplos marketplaces **sem grandes refatorações**, reutilizando a base aprovada.

### Base aprovada — Fase 1 (Consolidação)

| Capacidade | Onde | Responsabilidade |
|------------|------|------------------|
| Astro + build estático | config / `package.json` | Site HTML, deploy simples |
| Estrutura modular | `src/pages`, `components`, `content`, `data`, `modules` | Separação UI / dados / operação |
| Product Inventory | `src/data/products.ts` | Fonte autorizada de URLs afiliadas |
| CTAs afiliados | components / páginas / `commercialGuideBlocks` | Consomem o inventário (exceção MD: ver SSOT) |
| Affiliate Health Monitor | `src/modules/affiliate-monitor/` | Saúde de links, histórico, Health Score |
| SEO consolidado | layouts + manuais SEO | Canonical, metadados, regras estáveis |
| Componentes reutilizáveis | `src/components/` | Cards, tabelas, CTAs, shell |
| Content collections | `src/content/` | Blog / Melhores tipados |

**Visão aprovada, ainda não implementada:** redirect `/ir/` (wrapper de clique sempre derivado do inventário) — só quando houver necessidade operacional (tracking / troca centralizada). Não faz parte do código atual.

**Prioridades da Fase 1:** publicar conteúdo, ampliar catálogo, monitorar links, estabilizar arquitetura.

**Fora de escopo agora:** `/ir/`, dashboards, Playwright obrigatório, discovery automático, reescrita do inventário, publicação automática.

---

## Ordem recomendada de evolução

Sequência natural de **dependências e dor operacional** — não é cronograma.

```text
Fase 1 Consolidação (agora)
    → Fase 2 Article Builder
    → Fase 3 Product Catalog
    → Fase 4 Product Discovery
    → Fase 5 SEO Intelligence
    → Fase 6 Affiliate Intelligence
    → Fase 7 Content Planner
```

| Módulo | Depende de (quando fizer sentido) | Não faz |
|--------|-----------------------------------|---------|
| Article Builder | Inventário + componentes | Escrever o artigo final |
| Product Catalog | Inventário atual (evolução compatível) | Quebrar a fonte única |
| Product Discovery | Catalog / inventário | Publicar produtos sozinho |
| SEO Intelligence | Volume de artigos + rules SEO | Alterar conteúdo sozinho |
| Affiliate Intelligence | Health Monitor + inventário | Trocar links no ar sozinho |
| Content Planner | Sinais dos módulos acima | Publicar ou decidir sozinho |

Nenhum módulo futuro é **obrigatório** para o build estático ou para publicação manual.

---

## Detalhamento por módulo

### Fase 2 — Article Builder

| | |
|--|--|
| **Problema** | Montar estrutura de artigo novo (categoria, cards, tabela, schema, FAQ base) é repetitivo. |
| **Quando** | Volume de artigos justifica ganho na **estrutura**, não no texto. |
| **Métrica** | Tempo de setup estrutural; artigos/mês; “copiar template” recorrente. |
| **Manual** | Texto, ângulo, revisão, imagens, recomendações finais. |
| **Reusa** | Fonte única (`products.ts`), blocos comerciais, componentes, schemas SEO. |
| **Evitar** | Texto final sem revisão; auto-publish; CMS complexo cedo. |

**Saída:** rascunho estruturado → humano completa.

---

### Fase 3 — Product Catalog

| | |
|--|--|
| **Problema** | Inventário deixa de ser confortável (SKUs, atributos, prioridades, marketplaces). |
| **Quando** | Manter `products.ts` manualmente gera erro, atraso ou medo de editar. |
| **Métrica** | Nº de produtos/links; tempo para adicionar SKU; drift com markdown. |
| **Manual até lá** | Cadastro pontual no inventário atual. |
| **Reusa** | Contrato `ProdutoAfiliado`; monitor; plugins de marketplace. |
| **Evitar** | Duas fontes de verdade; banco obrigatório no build sem necessidade. |

**Futuro compatível:** score, prioridade, atributos, `monitorPriority`, status, histórico — **substituindo** `products.ts` como única fonte, não em paralelo.

---

### Fase 4 — Product Discovery

| | |
|--|--|
| **Problema** | Falta processo consistente para achar candidatos (lançamentos, lacunas). |
| **Quando** | “Não saber o que falta” vira risco editorial/comercial. |
| **Métrica** | Descoberta só por acaso; tempo caçando ofertas. |
| **Manual** | Curadoria e inclusão no catálogo. |
| **Reusa** | Catalog / inventário; registry de marketplaces. |
| **Evitar** | Auto-publish; scraper no critical path do site. |

**Saída:** sugestões para curadoria humana.

---

### Fase 5 — SEO Intelligence

| | |
|--|--|
| **Problema** | Muitos artigos → oportunidades e desatualização difíceis de ver. |
| **Quando** | Auditoria manual de SEO/conteúdo não escala. |
| **Métrica** | Nº de artigos; backlog de updates; tempo de auditoria. |
| **Manual** | Decisão do que atualizar e como reescrever. |
| **Reusa** | Collections; `seo-rules.md`; URLs estáveis. |
| **Evitar** | Alterar markdown automaticamente. |

**Saída:** sugestões (atualizar / expandir / criar).

---

### Fase 6 — Affiliate Intelligence

| | |
|--|--|
| **Problema** | Monitor aponta falhas; decisão de substituição ainda é ad hoc. |
| **Quando** | Problemas recorrentes ou volume monitorado exige sugestões estruturadas. |
| **Métrica** | Links monitorados; Health Score; tempo para substituir produto. |
| **Manual** | Escolher substituto e atualizar a fonte única. |
| **Reusa** | Affiliate Health Monitor; inventário/catalog. |
| **Evitar** | Troca automática de URLs; Playwright antes da necessidade. |

**Saída:** sugestões (substituto, marketplace, atualizar comparativo).

---

### Fase 7 — Content Planner

| | |
|--|--|
| **Problema** | Sinais existem, mas a pauta ainda é montada de forma dispersa. |
| **Quando** | Discovery / SEO / Affiliate já geram insumos e o alinhamento editorial custa caro. |
| **Métrica** | Sugestões dispersas; reuniões longas; categorias sem pipeline. |
| **Manual** | Priorização e pauta final. |
| **Reusa** | Saídas dos módulos 4–6; inventário; collections. |
| **Evitar** | Publicação ou redação final automática. |

**Exemplos de pauta sugerida:** produtos novos na categoria; comparativo a atualizar; categoria em crescimento; review ausente.

---

## Critérios de evolução (indicadores, não datas)

Exemplos de sinais reais:

- quantidade de artigos, produtos e links ativos
- tempo em tarefas repetitivas / taxa de manutenção manual
- Health Score e taxa de `ERRO_ACESSO`
- tráfego, receita e necessidade operacional explícita

Limiares numéricos, quando existirem, ficam na **configuração do módulo** — nunca espalhados no motor do site.

---

## Critérios de Entrada das Próximas Fases

Definir objetivamente **quando** cada fase poderá começar.  
Estar no roadmap **≠** autorização para implementar.

### Product Catalog

Iniciar somente quando:

- `products.ts` deixar de ser suficiente;
- o catálogo crescer significativamente;
- houver necessidade de atributos estruturados em larga escala.

### Article Builder

Iniciar somente quando:

- a produção de conteúdo apresentar etapas repetitivas;
- existir ganho mensurável de produtividade.

### Product Discovery

Iniciar somente quando:

- a pesquisa manual de produtos se tornar um gargalo.

### SEO Intelligence

Iniciar somente quando:

- houver volume suficiente de artigos para análises consolidadas.

### Affiliate Intelligence

Iniciar somente quando:

- houver múltiplos marketplaces ativos;
- existir necessidade recorrente de comparação entre marketplaces.

### Content Planner

Iniciar somente quando:

- o calendário editorial não puder mais ser administrado manualmente.

Critério de Entrada **+** métrica observável = autorização para *desenhar* a implementação. Detalhamento por módulo (problema / métrica / o que evitar) permanece nas seções da Fase 2–7 acima.

---

## Princípios permanentes de engenharia

- simplicidade, modularidade, baixo acoplamento, reutilização
- compatibilidade com Astro, build estático e execução manual
- não alterar arquitetura global (header, rotas, menu) sem pedido explícito
- URLs internas com barra final; não renomear slugs publicados sem redirect
- módulos operacionais desacoplados da UI
- nenhum módulo depende de outro **sem** necessidade comprovada
- cumprir a **Condição de Permanência** (acima)

### Deliberadamente fora do escopo até haver critério

Dashboard web · cron obrigatório no repo · Playwright como default · CMS headless obrigatório · publicação automática · reescrita da base Astro/Tailwind/collections.

---

## Visão em camadas

Fluxo **conceitual** e de dependências — **não** é estrutura de pastas:

```text
                 Content Planner
                        │
        SEO Intelligence │ Affiliate Intelligence
                 \        │        /
                  \       │       /
                 Product Discovery
                        │
                 Product Catalog
                        │
           Affiliate Health Monitor
                        │
               Product Inventory
                   (fonte única)
                        │
                   Astro Website
```

Leitura de baixo para cima: o site e o inventário sustentam tudo; camadas superiores só existem quando os Critérios de Entrada forem satisfeitos e **sugerem** — não publicam sozinhas.

---

## Como usar este documento

1. Aplicar a **Política Permanente de Governança** (gate inicial).
2. Se o gate passar, percorrer o **Fluxo de Decisão** (etapas 1–6).
3. Conferir **Filosofia**, **Fonte Única**, **Limites da Automação** e **Princípios permanentes**.
4. Abrir **Critérios de Entrada das Próximas Fases** (módulo novo).
5. Preferir estender inventário / monitor / components a criar sistemas paralelos.
6. Consultar `docs/TECH-DEBT.md` antes de “limpar” pendências conhecidas.
7. Atualizar este arquivo só quando um módulo for **implementado**, **removido** ou um critério for **refinado** com dados reais — não para antecipar features nem criar docs de arquitetura paralelos.

---

## Fechamento

Nenhum módulo deve ser implementado só porque está no roadmap.  
O roadmap é visão de possibilidades, não backlog obrigatório.

Princípios canônicos: seção **Princípios permanentes** (acima).

---

*Fase 1 encerrada. Documentação arquitetural consolidada. Documento normativo: este ROADMAP. Prioridade: conteúdo, catálogo, SEO, monitoramento e negócio.*
