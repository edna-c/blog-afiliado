# CHANGELOG – Documentação Casa Prática Eletro

**Responsabilidade:** histórico de mudanças documentais.  
Estado atual → `README.md` · Governança → `docs/ROADMAP-PLATAFORMA.md` · Dívidas → `docs/TECH-DEBT.md`.

Formato: mais recente no topo.

---

## 2026-07-30

### Motor III — L05A v2 (mesa vidro × inox)

- Master trocado: sem texto na arte; trempes iguais (eixo único = tampo).
- Status library: Validado · wiring ainda pendente.
- Paths: `src/assets/images/library/L05A.webp` + `public/images/library/L05A.webp`.

### Motor III — DNA: fotografia editorial (não render)

- Ativos Tipo B devem parecer **fotografia editorial de produtos reais**, não renderizações perfeitas.
- Objetivo: credibilidade / revista técnica; evitar sensação de “imagem de IA”.
- SSOT, Prompt §9, regra Cursor, backlog atualizados.

### Motor III — 1ª geração aprovada (lapidar, não recomeçar)

- Posição oficial: patrimônio aprovado como 1ª geração; refinar, não substituir.
- **Evoluir** L07A e L09A (excelentes conceitos — só perder texto).
- **Repensar** L05A (separar conceitos; não por estética).
- **Proibido** regenerar a biblioteca inteira.
- L06A validada como pedagogia visual · âncoras DNA L06A + L08A.

### Motor III — Princípio permanente + ritual v2.0

- Princípio permanente: **“Aprofundar o DNA, não inflar o inventário.”**
- **Teste de admissão:** todo novo ativo deve tornar a biblioteca melhor do que era antes — senão não entra.
- Efeito cumulativo documentado: herança de componentes/ativos → custo marginal ↓, consistência ↑.
- Ritual futuro **v2.0**: revisão de coerência da **coleção** (5 perguntas) após completar v1.0 — antes de expansão temática ampla.

### Motor III — Meta Biblioteca Técnica v1.0

- Norte: **20–30 ativos fundamentais**, mesmo DNA visual, reuso em dezenas de páginas.
- Ritmo até v1.0: **consistência > quantidade** — não expandir rápido; preferir v2, wiring e padronização.
- Após v1.0: novos ativos herdam o padrão consolidado.
- SSOT, Prompt §9, regra Cursor, backlog atualizados.

### Motor III — Status Oficial + Princípio Fundamental

- Arquitetura permanente **estabelecida**; ativos = **1ª geração**; evolução incremental (consistência, reuso, componentes, UX, cobertura).
- Princípio: Biblioteca Técnica = **sistema editorial** reutilizável — não coleção de imagens; cada ativo deve servir múltiplas páginas.
- Marco: acumular patrimônio editorial reutilizável, não só conteúdo de página.
- SSOT, Prompt §9, regra Cursor, backlog atualizados.

### Motor III — Biblioteca Técnica: arquitetura permanente (1ª geração)

- Redação oficial no SSOT: arquitetura permanente; ativos atuais = primeira geração; evolução incremental de qualidade/consistência/reuso.
- Fim da mentalidade “imagem para este artigo”; fase = sistema visual editorial.
- Regra Cursor + backlog alinhados.
- *Superseded / fundido* na entrada Status Oficial + Princípio Fundamental (mesmo dia).

## 2026-07-29

### Motor III — Biblioteca Técnica + L06A / L09A Incorporados

- Pasta `src/assets/images/library/` + espelho `public/images/library/` (Incorporados).
- `technicalLibrary.ts` + `TechnicalFigure.astro` / `ArticleTechnicalFigure.astro`.
- **L06A** (trempes ferro × aramada) wired em custo-benefício 5b, reviews 5b e Brastemp vale a pena.
- **L09A** (forno simples × duplo) no blog forno duplo.
- Staging sem wiring: L05A, L06B, L07A (texto na arte / validação).

## 2026-07-28

### Motor III — L01/IMG01 Incorporado (Tipo A)

- Guia `/blog/guia-fogao-embutir-ou-de-piso/`: `corpo-comparativo-embutir-vs-piso.webp` no corpo (após Comparativo rápido).
- Registry + lacuna L01 + gaps embutir marcados done; ficha de governança Editorial.

### Motor III — Classificação Tipo A × Tipo B (arquitetura permanente)

- Distinção obrigatória: **Tipo A** Editorial (contextual) vs **Tipo B** Técnico (reutilizável); packshots SKU = Comercial.
- Prioridade de produção: sempre **B antes de A**; A não compete com B na fila.
- Governança SSOT: categoria, reuso, vida útil, páginas atuais/futuras, aprovador, status (Planejado→Incorporado).
- Lacunas L01–L17 reclassificadas; ranking reprocessado (**L06 trempes** = 1º ativo Tipo B).
- Sprint Visual nº 1 anterior (L01 embutir×piso) **superseded** — L01 é Tipo A.
- Atualizados: Prompt §9, regra Cursor, `BIBLIOTECA_VISUAL.md` §0.1, backlog, `visualAssetRegistry.ts`.

### Motor III — Diagnóstico fechado + Sprint Visual nº 1 (plano)

- Gate 1–4 concluído no SSOT; ranking e **Sprint Visual nº 1** documentados só no backlog.
- Plano L01 (embutir × piso) com páginas, posições e objetivos — **sem implementação** (aguarda aprovação).
- *Nota:* plano L01 supersedido no mesmo dia pela classificação A/B (ver entrada acima).

### Motor III — SSOT permanente × backlog operacional

- Regra: o SSOT (`BIBLIOTECA_VISUAL.md`) não contém decisões editoriais temporárias, rankings de sprint nem “criar X agora”.
- Novo `docs/BACKLOG_PATRIMONIO_VISUAL.md` para ranking, tarefas e recomendação do primeiro ativo (L01).
- Prompt §9 e `.cursor/rules/modo-execucao-patrimonio-visual.mdc` alinhados.

### Motor III — Fluxo diagnóstico obrigatório

- Fluxo travado: Inventário → Biblioteca → Mapa de reuso → Lacunas → Ranking → só então primeiro ativo.
- Gate: nenhuma recomendação de criação/evolução antes de concluir o diagnóstico (1–4).
- `BIBLIOTECA_VISUAL.md` reestruturado; Prompt §9 e `.cursor/rules/modo-execucao-patrimonio-visual.mdc` atualizados.
- Inventário completo: 119 arquivos (66 canônicos + 53 staging); lacunas L01–L17; ranking; primeiro ativo = L01 embutir×piso (após gate).

### Motor III — Gestão estratégica do patrimônio visual

- `docs/BIBLIOTECA_VISUAL.md` reescrito como SSOT vivo: arquitetura, inventário (res/fmt/função/lifecycle), biblioteca por função, matriz de reuso, cobertura por tipo de página, lacunas, backlog por ativo, ciclo de vida, padronização.
- Nenhuma imagem criada, movida ou modificada.

### Motor III — Auditoria de inteligência da biblioteca visual

- Novo canônico `docs/BIBLIOTECA_VISUAL.md`: arquitetura (recomendações sem mover), inventário por categoria, biblioteca lógica, reuso, lacunas e backlog **por ativo**.
- Nenhuma imagem criada, movida ou modificada nesta entrega.
- Próxima produção sugerida (com aprovação): ativo P0 embutir × piso.

### Motor III — Patrimônio Visual (ativo)

- Prompt Mestre §9 em `BIBLIOTECA_DE_PROMPTS.md`; regra `.cursor/rules/modo-execucao-patrimonio-visual.mdc`.
- Registro SSOT: `src/data/visualAssetRegistry.ts` (ativos canônicos + gaps ALTA/MÉDIA/BAIXA).
- Modo crescimento (§8) permanece para erros críticos e quando não houver gap visual acionável.

### Sprint Motor III — Reuso no comparativo 4 vs 5

- `/comparativo-fogao-4-vs-5-bocas/`: duas figuras de corpo (reuso de blog 4 bocas + espaço 5 bocas) + OG alinhado à decisão de tamanho.
- Gap `gap-comparativo-4-vs-5-corpo` marcado como done no registry.

### Sprint Motor III — Reuso no comparativo vidro ou inox

- `/blog/fogao-mesa-de-vidro-ou-inox/`: heroes Consul vidro + Consul inox reutilizados dos hubs Melhores para contrastar o tampo.
- Gap `gap-blog-vidro-ou-inox-corpo` marcado como done no registry.

### Sprint Motor III — Reuso em artigos de mesa de vidro + organização de cards

- `/blog/review-fogao-com-mesa-de-vidro/` e `/blog/fogao-mesa-de-vidro-seguro/`: heroes dos hubs de mesa de vidro no corpo.
- Cards home: filenames alinhados ao SKU real (`consul-cfs5nab`, `electrolux-fe5ig`) + imports e script `optimize-card-sources.mjs`.

### Auditoria de imagens — critério de prioridade

- `MANUAL_DIRECAO_VISUAL.md`: prioridade ALTA / MÉDIA / BAIXA para imagens; princípio “função editorial”; Money Pages, guias e custo-benefício = MÉDIA (não ALTA automática por apresentar produtos).
- Em auditorias futuras: justificar sempre por que a imagem melhora a UX.

## 2026-07-27

### Sprint B — satélite «fogão 4 bocas custo-benefício»

- Nova URL `/fogao-4-bocas-custo-beneficio/`: ângulo preço/valor (Atlas medalha, Consul equilíbrio, Electrolux premium), espelhando o satélite do cluster 5 bocas.
- Money Page beneficiada: `/melhores/melhor-fogao-4-bocas/`. Interlinks no hub (aprofundar), checklist `como-escolher-fogao-4-bocas`, `editorialContent.ts` e mapa-base SEO.
- Priorização Motor II: comparado com «como escolher mesa de vidro» e review Consul CF04NAR; escolhido pelo maior potencial comercial + fechamento do funil 4 bocas.

### Sprint B — satélite «como escolher fogão 4 bocas»

- Nova URL `/como-escolher-fogao-4-bocas/`: checklist pré-compra (medidas, gás, mesa, forno) espelhando o satélite do cluster 5 bocas.
- Money Page beneficiada: `/melhores/melhor-fogao-4-bocas/`. Interlinks no hub (aprofundar / como avaliamos / antes), blog «vale a pena», comparativo 4 vs 5, `editorialContent.ts` e related paths do blog.
- Mapa-base em `docs/seo-rules.md` atualizado (hubs 4 bocas, mesa de vidro e satélites «como escolher»).
- Próximo ativo de maior retorno no mesmo cluster (sprint seguinte): `/fogao-4-bocas-custo-beneficio/` — intenção distinta do ranking; espelha o satélite comercial do 5 bocas.

### Ritmo de sprints 70/30 — A Otimização / B Expansão

- Prompt Mestre §8 e `.cursor/rules/modo-execucao-crescimento.mdc`: **Sprint A (~70%)** = GSC, CTR, pos. 5–30, conversão, interlinks; **Sprint B (~30%)** = páginas de decisão, comparativos, guias, novos clusters.
- Relatório declara o tipo (A ou B). B só sem canibalização e sem gap A de maior impacto imediato.
- Evolução: proporção **depende do nº de páginas consolidadas** — ~100–150 → ~50/50; domínio forte → possível inversão (mais expansão). Só com decisão explícita.

### Otimização GSC em etapas (posições 5–30)

- Prompt Mestre §8 e `.cursor/rules/modo-execucao-crescimento.mdc`: páginas na faixa 5–30 otimizam em 3 etapas isoladas (1 title/description → indexação; 2 resposta direta/FAQ/editorial → ciclo GSC; 3 interlinks/ajustes finais).
- “Uma etapa por sprint na mesma URL” é **diretriz**, não lei absoluta — exceção para incompleto/erro técnico crítico (corrigir de uma vez e registrar no relatório).

## 2026-07-26

### Dados externos — não paralisar execução

- Prompt Mestre §8 e `.cursor/rules/modo-execucao-crescimento.mdc`: se a prioridade depender de GSC/Analytics/afiliados, pedir só o mínimo e aguardar; enquanto isso, executar melhorias estruturais/editoriais/técnicas independentes desses dados.

### Fase Consolidação e Escala — prioridade em ativos existentes

- `docs/BIBLIOTECA_DE_PROMPTS.md` §8 e `.cursor/rules/modo-execucao-crescimento.mdc`: fase ativa **Consolidação e Escala** até segunda ordem.
- Prioridade: páginas com impressões / posições GSC 5–30 / CTR fraco / potencial de expansão e interlinks — **antes** de criar URLs novas.
- Checklist de página “fortalecida”: intenção completa, interlinks, CTAs comerciais coerentes, atualização com GSC, sem gaps de alto impacto pendentes.
- Nova URL só após confirmar que não há crescimento mais relevante em página existente.

### Prompt Mestre — Modo Execução e seleção automática

- `docs/BIBLIOTECA_DE_PROMPTS.md` §8: Prompt Mestre (continuidade + seleção automática da próxima tarefa).
- `.cursor/rules/modo-execucao-crescimento.mdc`: regra alwaysApply espelhando a seleção automática.
- `docs/MANUAL_INTERACAO_AGENTES.md`: Princípio Geral compatível com Modo Execução quando ativo.
- Critérios de seleção: build/SEO crítico → páginas existentes (GSC 5–30, impressões, CTR, interlinks) → novas URLs só sem canibalização → atualizar antes de duplicar → visual só com impacto comprovado; gate pré-tarefa (≤3 frases + objetivo + anti-canibalização).
- Relatório de sprint inclui **Indicador de sucesso** (métrica + como validar): ciclo Tarefa → Objetivo → Impacto → Métrica de validação.

---

## 2026-07-24

### Encerramento definitivo da documentação arquitetural — Fase 1

- ROADMAP declarado **documento normativo** da plataforma.
- Responsabilidades únicas: README (estado) · ROADMAP (governança/evolução) · CHANGELOG (histórico) · TECH-DEBT (adiados).
- Redundâncias removidas; princípios e políticas só no ROADMAP.
- Sem alteração funcional.

### Consolidação documental da Fase 1

- Princípios permanentes e Política Permanente de Governança no ROADMAP; README/TECH-DEBT enxutos.
- Prioridade operacional e fechamento da Fase 1 registrados no ROADMAP.

### Manutenção de consistência e criação do ROADMAP

- README fora do starter Astro; blueprint/auditorias; ROADMAP inicial; TECH-DEBT; alinhamento SSOT/`/ir/`.

---

## 2026-07-14

### Design System — Princípio 10 (Responsividade Editorial)

- `MANUAL_DESIGN_SYSTEM.md` §2: novo princípio oficial — responsividade como experiência de leitura (não só CSS), consistente em mobile, tablet, notebook e desktop.
- Diretrizes: Hero reorganiza texto/imagem; cards 3→2→1; tabelas legíveis; imagens com proporção íntegra; CTAs tocáveis; ritmo preservado.
- Seção renomeada para “dez princípios”; checklist (§8) inclui verificação de Responsividade Editorial.

---

## 2026-07-13

### Design System — cards comerciais e links afiliados

- `MANUAL_DESIGN_SYSTEM.md` §6.1: DNA visual oficial do packshot de card (3/4, fundo escuro, WebP ~1254², conjunto editorial).
- Novo §7: estrutura do card, CTAs (ML primário / Shopee opcional), `products.ts` como fonte única, `rel` sponsored; checklist e objetivo renumerados (§8 / §9).

### Design System — Princípio 9 (Banco Editorial de Imagens)

- `MANUAL_DESIGN_SYSTEM.md` §2: novo princípio oficial — imagens comerciais tratadas como conjunto (consistência visual, mesma linguagem fotográfica, direção de arte e percepção de qualidade), nunca seleção isolada por produto.
- Seção renomeada para “nove princípios”; checklist (§7) cruzado com o Princípio 9 e §6.

### Design System — imagens de produtos (uso comercial)

- `MANUAL_DESIGN_SYSTEM.md` §6: regras oficiais para imagens comerciais (fabricante → loja oficial, sem marca d’água/promo, enquadramento consistente, WebP/alta resolução, aprovação antes do repositório).
- Checklist estrutural (§7) inclui verificação das regras de imagem; objetivo final renumerado para §8.

---

## 2026-07-11

### Manual de Direção Visual

- Criado `MANUAL_DIRECAO_VISUAL.md` — princípios de composição, ritmo e aproveitamento visual.
- Modelo oficial de experiência: Melhor Fogão 5 Bocas.
- Complementa (não substitui) o `MANUAL_DESIGN_SYSTEM.md`: direção = composição; Design System = tokens/implementação.
- Referências cruzadas em Design System, Página de Decisão e Manual Design.

### SSOT editorial — Página de Decisão

- `MANUAL_PAGINA_DECISAO.md` é o **único** manual editorial de páginas comerciais (artigo afiliado + página de decisão fundidos).
- **Modelo oficial:** configuração geral do Fogão 5 bocas (home + hub + satélites + reviews + `products.ts`).
- Removido `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md` (não há mais ponte nem segundo arquivo).
- Conteúdo útil do antigo framework incorporado ao canônico.
- Ranking só no Hero — não repetir no corpo.
- Referências cruzadas apontam apenas para `MANUAL_PAGINA_DECISAO.md`.

### Revisão final de direção de arte — guia comercial congelado

- Microajustes de respiro: stack 4.5rem, fechamento 6rem, FAQ e justificativas com ar entre unidades.
- Checklists de decisão: leve respiro entre itens de lista.
- Tokens §3.5 do `MANUAL_DESIGN_SYSTEM.md` atualizados (referência oficial).

### Acabamento editorial — respiro premium (direção de arte)

- Escala de ritmo do guia comercial ampliada: stack 4.25rem, fechamento 5.5rem, H2→intro 1.15rem.
- Justificativas: mais ar entre medalhas (hr), sob imagens e nos H3.
- FAQ: mais respiro título→lista, pergunta→resposta e entre itens.
- Relacionados: pausa maior antes do encerramento + leve respiro interno.

### Acabamento — ritmo vertical do guia comercial (modelo oficial)

- Página Melhor Fogão 4 Bocas: tokens `--editorial-stack` / `--editorial-stack-close` e hierarquia H2 uniforme (escopo `.guide-editorial`).
- FAQ: respiro sutil entre pergunta/resposta e entre itens; `dt` com peso 700.
- Relacionados: respiro maior antes do encerramento editorial.
- `MANUAL_DESIGN_SYSTEM.md` §3.5 atualizado com a escala de ritmo.

### Design System — Layout Editorial Amplo (SSOT)

- Criado `MANUAL_DESIGN_SYSTEM.md` como **Single Source of Truth** da identidade visual e arquitetura de layout do portal.
- Princípios oficiais: Layout Editorial Amplo, Container Único, Largura por Contexto, Módulos, Ritmo vertical, Escaneabilidade, Experiência editorial, Design System flexível.
- Regra permanente: consultar este manual antes de qualquer mudança estrutural de layout/componentes/grids/tipografia.
- `MANUAL_DESIGN.md` passou a ser ponte legada apontando para o SSOT (sem documento duplicado de regras).

### Framework editorial afiliado (padrão definitivo)

- Reescrito `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md` como framework de **página de decisão** (não artigo longo).
- Ordem oficial: Hero (box ranking) → Intro → Cards → Tabela → Justificativas ×3 → Como avaliamos → Perfil → Antes de comprar → Aprofundar → FAQ → Relacionados.
- Artigo-padrão alinhado: Melhor Fogão 4 Bocas (justificativas de medalha + seções com info nova).
- Regra central: cada seção só permanece se acrescentar informação nova à decisão de compra.

---

## 2026-07-10

### Documentação oficial

- Criada a estrutura permanente em `docs/`:
  - `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md` (referência oficial de artigos afiliados; baseado no Melhor Fogão 4 Bocas reestruturado)
  - `MANUAL_SEO.md` (estrutura; detalhe ainda em `seo-rules.md`)
  - `MANUAL_DESIGN.md` (estrutura)
  - `PADROES_DE_COMPONENTES.md` (estrutura)
  - `BIBLIOTECA_DE_PROMPTS.md` (estrutura + prompts iniciais)
  - `CHANGELOG.md` (este arquivo)
- Removido o caminho legado `manual-editorial-guias-afiliados.md` em favor do canônico `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md`.

### Regra de manutenção

- Novos padrões → incorporar no manual canônico correspondente.
- Não criar “versão 2” de manuais; atualizar o arquivo oficial e registrar aqui.
