# BIBLIOTECA DE PROMPTS – CASA PRÁTICA ELETRO

**Status:** documentação permanente (estrutura oficial)  
**Caminho canônico:** `docs/BIBLIOTECA_DE_PROMPTS.md`

### Como usar

1. Reutilize os prompts abaixo para tarefas recorrentes (artigos afiliados, SEO, revisão editorial).
2. Quando um prompt se estabilizar na prática, **incorpore-o aqui** (não espalhar em chats soltos).
3. Atualize este arquivo em vez de criar “biblioteca v2”.

Documentação relacionada: `MANUAL_PAGINA_DECISAO.md`, `MANUAL_SEO.md`, `CHANGELOG.md`.

---

## 1. Objetivo

Padronizar instruções para agentes e colaboradores humanos, alinhadas aos manuais oficiais.

---

## 2. Regras ao usar prompts

- Sempre referenciar `docs/MANUAL_PAGINA_DECISAO.md` em tarefas de Página de Decisão
- Não pedir alteração de arquitetura/componentes em prompt de conteúdo
- Preferir “atualizar o manual” quando surgir regra nova

---

## 3. Prompt – nova Página de Decisão

```text
Consulte docs/MANUAL_PAGINA_DECISAO.md antes de qualquer estrutura.

Crie a Página de Decisão sobre: [CATEGORIA / ANO].
Modelo oficial: Fogão 5 bocas (home + hub + satélites + reviews).

Ordem obrigatória:
Hero (box ranking) → Intro 1 linha → Cards → Tabela →
Justificativas ×3 → Como avaliamos → Perfil (empate) →
Antes de comprar → Aprofundar → FAQ

Regras:
- Cada seção acrescenta info NOVA à decisão
- Justificativas defendem a medalha (não mini-artigos)
- Ranking só no hero; não repetir no corpo
- Satélite = dúvida → link
- Espelhar o cluster Fogão 5 bocas (não reinventar o funil)
- Sem componentes/CSS/template novos

Pergunta da página: "Qual produto devo comprar e por quê?"
```

---

## 4. Prompt – revisão editorial de Página de Decisão

```text
Audite a Página de Decisão em [CAMINHO] contra docs/MANUAL_PAGINA_DECISAO.md.

Entregue:
1. Violações da ordem oficial
2. Repetições (regra de ouro)
3. Trechos educativos que deveriam ser link satélite
4. Reviews fora do molde
5. CTAs afastados da decisão
6. Lista objetiva de cortes/ajustes (sem implementar, salvo pedido)
```

---

## 5. Prompt – só conteúdo, zero arquitetura

```text
Ajuste apenas markdown/conteúdo editorial.
Não alterar: componentes, templates, rotas, navegação, design system, dados de afiliado em TS (salvo pedido explícito).
Seguir docs/MANUAL_PAGINA_DECISAO.md e docs/PADROES_DE_COMPONENTES.md §2.
```

---

## 6. Prompt – SEO de página

```text
Consulte docs/MANUAL_SEO.md (e docs/seo-rules.md enquanto a consolidação não terminar).
Revise metadados, headings, internal links e schema da página [URL/PATH].
Não alterar arquitetura. Liste gaps e correções mínimas.
```

---

## 7. Prompt – atualizar documentação

```text
Um novo padrão foi decidido: [DESCRIÇÃO].
Atualize o manual canônico correspondente em docs/ (não crie arquivo novo de “versão”).
Registre a mudança em docs/CHANGELOG.md.
```

---

## 8. Prompt Mestre — Modo Execução (crescimento)

**Quando usar:** fase de crescimento do patrimônio digital (tráfego, autoridade, receita).  
**Fase ativa:** **Consolidação e Escala** — maximizar ativos já publicados antes de criar URLs novas.  
**Ativa continuidade:** o agente não espera nova instrução quando a próxima prioridade puder ser inferida.

```text
# MODO EXECUÇÃO — CASA PRÁTICA ELETRO
# Fase: Consolidação e Escala

Opere em modo de execução para aumentar o patrimônio digital (tráfego orgânico, autoridade temática, receita) a partir dos ativos já construídos.

## Aprovação humana — só nestes casos
- alteração arquitetural significativa;
- criação de novos módulos;
- mudanças estruturais irreversíveis;
- decisões estratégicas que alterem o direcionamento do projeto.

Nos demais casos: Analise → Decida → Implemente → Valide → Relatório final.

## Continuidade
Ao concluir um sprint: atualize o estado do projeto, escolha a próxima tarefa pela ordem abaixo e inicie imediatamente.
Só interrompa se houver risco arquitetural ou decisão estratégica humana.

## DADOS EXTERNOS (GSC, Analytics, afiliados)

Se a próxima prioridade depender de dados externos (Google Search Console, Analytics ou receita de afiliados):
- solicite apenas os dados estritamente necessários;
- aguarde a disponibilização (não invente métricas nem priorize no escuro).

Enquanto esses dados não estiverem disponíveis: execute automaticamente todas as melhorias estruturais, editoriais e técnicas independentes desses dados (funil interno, CTAs, interlinks, SEO on-page, freshness, schema, lacunas de intenção evidentes no código).
Não paralise o Modo Execução à espera de export quando ainda houver gaps independentes de alto impacto.

## FASE DE CONSOLIDAÇÃO E ESCALA (até segunda ordem)

Priorize aumentar o desempenho das páginas que já apresentam sinais positivos no Google Search Console antes de criar novas URLs.

## RITMO DE SPRINTS (70 / 30 — proporção atual)

Sprint A — Otimização (~70% hoje):
- Search Console
- CTR
- Páginas posição 5–30
- Conversão
- Links internos

Sprint B — Expansão (~30% hoje):
- Novas páginas de decisão
- Comparativos
- Guias de compra
- Novos clusters

Evolução da proporção — **depende do número de páginas bem consolidadas** (e da força do domínio); só muda com decisão explícita:
- Agora (poucas dezenas de URLs): ~70% A / ~30% B
- ~100–150 páginas bem consolidadas: ~50% A / ~50% B
- Domínio forte: pode inverter — cada nova página ranqueia com mais facilidade

Como aplicar (proporção vigente): na maior parte do tempo, tarefas de Sprint A. Abrir Sprint B só quando ampliar o mapa arquitetural / mapa-base SEO, não houver URL com a mesma intenção, e não houver gap A de maior impacto imediato (ou após um bloco razoável de otimização). Declarar no relatório: Sprint A ou Sprint B.

Páginas prioritárias (A):
- já recebem impressões;
- possuem consultas entre as posições 5 e 30;
- apresentam potencial de aumento de CTR;
- podem ser fortalecidas com expansão de conteúdo, atualização editorial, melhoria da intenção de busca e links internos.

Antes de propor uma nova página (B), confirme que não existe oportunidade de crescimento mais relevante em uma página já existente.

## OTIMIZAÇÃO EM ETAPAS (posições 5–30)

Quando a página estiver entre as posições 5 e 30, execute as otimizações em etapas. Evite alterar muitos fatores simultaneamente para identificar o que gerou impacto.

Etapa 1 — title + meta description → aguardar indexação.
Etapa 2 — resposta direta + FAQ + enriquecimento editorial → aguardar novo ciclo do Search Console.
Etapa 3 — links internos + ajustes finais.

Uma etapa por sprint na mesma URL é a **diretriz padrão** (para isolar impacto) — não uma lei absoluta. Exceção: página claramente incompleta, erro técnico/SEO crítico ou ativo quebrado → corrigir o necessário de uma vez e registrar no relatório o que foi agrupado e por quê. Enquanto aguarda indexação/ciclo GSC, pode fazer Etapa 1 em outra URL prioritária ou melhorias independentes de dados. Não avançar Etapa 2/3 da mesma página sem evidência do ciclo anterior, salvo essas exceções.

Considere uma página "fortalecida" somente após verificar que:
- cobre completamente a intenção de busca;
- possui links internos suficientes;
- apresenta CTAs comerciais coerentes;
- foi atualizada conforme os dados do Google Search Console;
- não existem melhorias adicionais de alto impacto antes de partir para uma nova URL.

## SELEÇÃO AUTOMÁTICA DA PRÓXIMA TAREFA

Ao concluir qualquer sprint:

1. Corrija erros críticos de build, renderização ou SEO técnico.
2. Priorize páginas já existentes que apresentem maior potencial de crescimento, considerando:
   - Google Search Console (consultas entre posições 5 e 30);
   - impressões crescentes;
   - CTR abaixo do esperado;
   - oportunidades de links internos.
3. Somente crie novas páginas quando ampliarem a cobertura temática do mapa arquitetural, não houver outra URL com a mesma intenção de busca, e as páginas prioritárias relevantes já estiverem fortalecidas (checklist acima).
4. Atualize conteúdos antigos antes de criar conteúdos semelhantes.
5. Refinamentos visuais apenas quando houver impacto comprovado em UX, SEO ou conversão.

Antes de iniciar a próxima tarefa:
- explique em no máximo três frases por que ela possui maior potencial de impacto;
- informe qual objetivo ela atende (SEO, autoridade, UX ou receita);
- confirme que ela não gera canibalização com páginas existentes.

## Frentes (= ritmo 70/30)
Sprint A — Otimização (~70%): GSC, CTR, pos. 5–30, conversão, interlinks. Dominante.
Sprint B — Expansão (~30%): páginas de decisão, comparativos, guias, novos clusters — só do mapa arquitetural / mapa-base SEO e sem canibalização.

## Relatório de sprint (somente)
• Tipo: Sprint A (Otimização) ou Sprint B (Expansão).
• O que foi feito.
• Qual impacto esperado.
• Indicador de sucesso — métrica que deverá melhorar e como validar (ex.: impressões, posição média, CTR, cliques, cliques afiliados, Core Web Vitals, erros no Search Console).
• Qual a próxima melhor tarefa — com ≤3 frases de impacto, objetivo (SEO/autoridade/UX/receita) e confirmação anti-canibalização, se for iniciar em seguida.

Ciclo completo de cada tarefa: Tarefa → Objetivo → Impacto → Métrica de validação.

## Restrições
Não criar documentação desnecessária. Não abrir novas frentes. Não reinventar arquitetura. Não alterar componentes só por estética.
Toda decisão deve aumentar tráfego, autoridade, conversão ou escalabilidade.
```

Referência de mapa de intenções: `docs/seo-rules.md` (mapa-base). Página de Decisão: `docs/MANUAL_PAGINA_DECISAO.md`.

---

## 9. Prompt Mestre — Motor III — Patrimônio Visual

**Quando usar:** gestão do patrimônio visual (organização, reuso, escala editorial).  
**Status:** **ativo** até segunda ordem.  
**SSOT permanente:** `docs/BIBLIOTECA_VISUAL.md`.  
**Backlog operacional:** `docs/BACKLOG_PATRIMONIO_VISUAL.md`.  
**Registry:** `src/data/visualAssetRegistry.ts`.  
**Regra Cursor:** `.cursor/rules/modo-execucao-patrimonio-visual.mdc`.

```text
# MODO EXECUÇÃO — MOTOR III — PATRIMÔNIO VISUAL

Construa um patrimônio visual organizado, escalável e reutilizável —
não apenas “produzir imagens”.

## Fase atual
Arquitetura permanente **estabelecida**. Ativos = 1ª geração.
Evolução incremental: consistência · reuso · componentes · UX · cobertura temática.
Não reinventar o sistema a cada sprint.

## Princípio Fundamental
A Biblioteca Técnica não é coleção de imagens —
é sistema editorial de ativos técnicos reutilizáveis
(explicar conceitos, apoiar compra, autoridade temática).
Cada ativo deve servir múltiplas páginas sem adaptação para um único artigo.
Mentalidade: patrimônio editorial reutilizável (não “imagem para este artigo”).

## Meta v1.0
20–30 ativos fundamentais · mesmo DNA visual · reuso em dezenas de páginas.
Até lá: não expandir rápido — consistência > quantidade
(preferir v2, wiring, padronização a muitas lacunas novas).
Após v1.0: novos ativos herdam o padrão.

## Princípio permanente (ritmo)
Aprofundar o DNA, não inflar o inventário.
Patrimônio = qualidade + reuso + coerência — não volume.
Teste de admissão: todo novo ativo deve tornar a biblioteca
melhor do que era antes — senão não entra.

## DNA de referência
Âncoras: L06A + L08A.
Novos Tipo B devem parecer da mesma família.
L08A designada (arte pendente no DNA de L06A).
L09A ≠ âncora até alinhada.

## Pós–v1.0 → ritual v2.0
Revisão de coleção (não ativo a ativo):
mesma família visual? mesma profundidade? algum destoa?
lacunas importantes antes de novos temas?

## 1ª geração — lapidar, não recomeçar
Aprovada. Evoluir L07A/L09A (sem texto). Repensar L05A.
Âncoras DNA: L06A + L08A. Proibido regenerar tudo.

## DNA — fotografia editorial
Ativos devem parecer fotografia editorial de produto real,
não renderização perfeita. Evitar aspecto sintético / “imagem de IA”.

## Classificação obrigatória
Tipo A — Editorial (contextual): narrativa de página; baixo reuso; experiência do leitor.
Tipo B — Técnico (reutilizável): critério de compra permanente; alto reuso; acervo do site.
Packshot de SKU: comercial (fora do eixo A/B; sob demanda de URL).

Prioridade: sempre Tipo B antes de Tipo A.
Tipo A nunca compete com B na fila.

## Antes de propor qualquer ativo
1. Explica conceito técnico permanente? → Tipo B
2. Só contextualiza um artigo? → Tipo A
3. Reuso: Baixo (1–2) · Médio (3–10) · Alto (11–30) · Patrimônio (>30)
4. Vale produção profissional? Justificar.
5. Torna a biblioteca melhor do que era antes? Se não → não propor.

## Governança SSOT (por ativo)
categoria · potencial de reuso · vida útil · páginas atuais · páginas futuras
· responsável pela aprovação · status (Planejado|Produzido|Validado|Incorporado)

## SSOT × backlog
- BIBLIOTECA_VISUAL.md = permanente (existência, path, uso, A/B, lacunas, governança).
- BACKLOG_PATRIMONIO_VISUAL.md = operacional (ranking B→A, sprints, tarefas).
- O SSOT nunca contém decisões editoriais temporárias (“nesta semana criamos X”).

## Fluxo obrigatório
1. Inventário completo → SSOT
2. Biblioteca organizada → SSOT
3. Mapa de reutilização → SSOT
4. Lacunas completas (classificadas A/B) → SSOT
5. Ranking (Tipo B primeiro) → backlog
6. Só então — recomendar o primeiro ativo → backlog

Gate: nenhuma recomendação de criação/evolução antes de 1–4.

## Princípios
- Reutilizar antes de produzir.
- Função editorial ou técnica obrigatória.
- DNA: MANUAL_DESIGN_SYSTEM §6 / §6.1 + editorialImageSpecs.ts.
- Novo arquivo no repositório só com aprovação humana.

## Relatório
Declarar SSOT / backlog / ambos. Em 1–4: sem recomendar ativo.
Em proposta: responder as 4 perguntas + classificação A/B.
```

Critério ALTA/MÉDIA/BAIXA por tipo de página: `docs/MANUAL_DIRECAO_VISUAL.md`.

---

## 10. Prompt — página de marca Atlas (trava de canibalização)

**Quando usar:** criar, editar ou otimizar SEO de URL cuja intenção é **avaliação da marca Atlas** (ex.: “Fogão Atlas é bom?”).  
**Regra de agente:** `.cursor/rules/canibalizacao-pagina-atlas.mdc`.

```text
CONTROLE DE CANIBALIZAÇÃO:
Esta página tem como intenção primária a avaliação da marca Atlas e a decisão de compra relacionada à marca. Não transformá-la em ranking geral de fogões, não otimizar o conteúdo como concorrente de /melhores/melhor-fogao-4-bocas/ ou /melhores/melhor-fogao-mesa-de-vidro/, e não criar seções cujo objetivo principal seja disputar as palavras-chave dessas páginas. Quando mencionar essas categorias, fazê-lo apenas como contexto ou através de links internos para as páginas existentes.

- Title / H1 / description / FAQ: marca Atlas, não “melhor fogão 4 bocas” nem “melhor fogão mesa de vidro”.
- SKUs Atlas = exemplos da marca (inventário atlasMonacoPlus / atlasAtenasGlass), não Top 3 de categoria.
- 4 bocas ou mesa de vidro: contexto ou link para a URL dona (barra final). Proibido hero/cards/tabela de ranking de hub.
```

---

## 11. Espaço para novos prompts

<!-- Adicionar prompts estáveis abaixo, com título numerado e data no CHANGELOG. -->

- [ ] Prompt – atualização de ranking anual
- [ ] Prompt – criação de artigo satélite (Blog)
- [ ] Prompt – revisão de CTAs / links afiliados
