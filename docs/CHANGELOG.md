# CHANGELOG – Documentação Casa Prática Eletro

**Responsabilidade:** histórico de mudanças documentais.  
Estado atual → `README.md` · Governança → `docs/ROADMAP-PLATAFORMA.md` · Dívidas → `docs/TECH-DEBT.md`.

Formato: mais recente no topo.

---

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
