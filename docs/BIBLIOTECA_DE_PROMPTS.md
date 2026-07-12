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

## 8. Espaço para novos prompts

<!-- Adicionar prompts estáveis abaixo, com título numerado e data no CHANGELOG. -->

- [ ] Prompt – atualização de ranking anual
- [ ] Prompt – criação de artigo satélite (Blog)
- [ ] Prompt – revisão de CTAs / links afiliados
