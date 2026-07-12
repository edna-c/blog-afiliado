# MANUAL DESIGN SYSTEM – CASA PRÁTICA ELETRO

**Status:** Single Source of Truth (SSOT) — Design System e identidade visual do portal  
**Caminho canônico:** `docs/MANUAL_DESIGN_SYSTEM.md`  
**Escopo:** todo o portal (Home, Guias, Blog, Comparativos, Reviews, Institucionais e páginas futuras)

### Prevalência

Este manual **prevalece** sobre decisões isoladas tomadas em conversas, prompts ou ajustes pontuais anteriores.  
Em conflito entre um pedido ad hoc e este documento, **este documento vence** — até ser atualizado formalmente.

Documentação relacionada (não substitui este SSOT):

| Documento | Papel |
|-----------|--------|
| `MANUAL_DIRECAO_VISUAL.md` | **Composição e ritmo** de leitura (direção visual) |
| `MANUAL_PAGINA_DECISAO.md` | Framework de **conteúdo** das páginas de decisão (SSOT editorial) |
| `PADROES_DE_COMPONENTES.md` | Inventário e uso de componentes |
| `MANUAL_DESIGN.md` | Ponte legada → redireciona para este arquivo |
| `site-blueprint.md` | Arquitetura técnica do repositório |
| `CHANGELOG.md` | Histórico de mudanças na documentação |

---

## Regra permanente (obrigatória)

Antes de qualquer alteração que impacte layouts, componentes compartilhados, grids, containers, espaçamentos, tipografia, identidade visual ou experiência editorial do portal, **consulte obrigatoriamente este manual**.

Nenhuma mudança estrutural deverá ser proposta ou implementada sem verificar previamente se está alinhada aos princípios definidos neste documento.

Este manual passa a ser a **fonte oficial de verdade (Single Source of Truth)** para todas as decisões relacionadas ao Design System do Casa Prática Eletro.

---

## 1. Identidade do portal

O Casa Prática Eletro **não** é um blog tradicional.  
O Casa Prática Eletro **não** é uma loja virtual.

É um **portal editorial moderno**, onde leitura, comparação e decisão de compra devem ser naturalmente agradáveis.

O visitante deve perceber, nos primeiros segundos:

- organização  
- conforto visual  
- qualidade editorial  
- autoridade e confiança  

Toda decisão de design deve reforçar essa percepção.

---

## 2. Os oito princípios oficiais

### Princípio 1 — Layout Editorial Amplo

O portal adota oficialmente um **Layout Editorial Amplo**.

| É | Não é |
|---|--------|
| Container editorial amplo, consistente e confortável | Página Full Width (borda a borda de conteúdo) |
| Espaço para módulos respirarem | Linhas de texto extremamente longas |
| Elegância e organização | “Esticar” prosa só para preencher tela |

### Princípio 2 — Container Editorial Único

Um único **Container Editorial** reutilizável para todo o portal.

Serve de base para: Home, Guias de Compra, Blog, Comparativos, Reviews, Institucionais, categorias e páginas futuras.

Objetivo: eliminar a competição entre múltiplos `max-width` espalhados.

### Princípio 3 — Largura por Contexto

O container é único.  
A **largura útil de cada bloco** depende da função do componente.

| Contexto | Comportamento desejado |
|----------|------------------------|
| Parágrafos longos (prosa) | Largura confortável para leitura (não “parede”) |
| Checklist / listas de decisão | Pode usar mais da largura do container |
| Tabelas / comparativos | Aproveitar bem o espaço do container |
| Cards | Respirar; grid modular |
| FAQ | Largura adequada ao conteúdo (escaneável) |
| Hero / módulos comerciais | Usar o container com hierarquia forte |

**Não** fixar rigidamente “sempre 65ch para tudo”.  
**Sim** definir medidas por contexto (prosa vs módulo vs tabela), sempre **dentro** do mesmo shell.

### Princípio 4 — Módulos

O portal organiza-se em **módulos independentes**, cada um com uma função e valor claros.

Exemplo (página de decisão — ver também manual editorial):

```text
Hero → Cards → Tabela → Justificativas → Como avaliamos →
Perfil → Antes de comprar → FAQ → Relacionados
```

Cada módulo deve:

- ter um propósito  
- acrescentar valor à jornada  
- respirar visualmente  

### Princípio 5 — Ritmo vertical

O espaçamento vertical faz parte da identidade.

- Não colar blocos  
- Não usar gaps aleatórios  
- Fluxo perceptível entre módulos (respiração consistente)

O visitante deve sentir progresso natural ao rolar.

### Princípio 6 — Escaneabilidade

Evitar: paredes de texto, excesso de parágrafos, corredores visuais.  
Priorizar: blocos, cards, tabelas, listas, comparativos, caixas informativas, espaço em branco.

### Princípio 7 — Experiência editorial

Nem blog genérico, nem marketplace.  
Portal editorial premium: autoridade, organização, clareza, confiança, conforto, modernidade.

### Princípio 8 — Design System flexível

O mesmo DNA visual acomoda: guias, educativos, comparativos, reviews, tutoriais, institucionais.

**Muda o conteúdo. Não muda a identidade editorial.**

---

## 3. Arquitetura definitiva proposta (ainda não implementada)

### 3.1 Tokens (a formalizar no código quando autorizado)

| Token | Função | Direção sugerida |
|-------|--------|------------------|
| `--editorial-shell` | Largura máxima do Container Editorial | Alinhar à home atual (~`80rem` / `max-w-7xl`) ou meio-termo (~`72rem`) — **decidir na Fase 0** |
| `--editorial-gutter` | Padding horizontal do shell | Unificar `px-4` / `sm:px-6` / `lg:px-8` |
| `--editorial-prose` | Medida da prosa contínua | Flexível por contexto (ex. faixa ~60–75ch), não dogma rígido |
| `--editorial-stack-*` | Ritmo vertical entre módulos | Escala única (ex. sm / md / lg / xl) |

### 3.2 Container Editorial Único

Componente ou utilitário canônico (nome sugerido: `EditorialContainer` / classe `.editorial-container`):

- Envolve o conteúdo principal de **todas** as páginas  
- Substitui gradualmente `max-w-2xl`, `max-w-3xl`, `max-w-7xl` e overrides em `global.css`  
- Header/Footer alinhados ao mesmo gutter (Header já é full-bleed; o conteúdo interno alinha ao shell)

### 3.3 Largura por contexto (camadas)

```text
Viewport
  └─ Header (full width)
  └─ EditorialContainer (shell único)
        ├─ Módulo Hero          → usa shell
        ├─ Módulo Cards/Tabela  → usa shell (respiração)
        ├─ Módulo Prosa         → medida de leitura (contexto)
        ├─ Módulo FAQ           → shell ou sub-medida adequada
        └─ Módulo Relacionados  → shell
  └─ Footer (full width / shell interno)
```

### 3.4 Relação com os manuais de conteúdo e direção

| Manual | Decide |
|--------|--------|
| `MANUAL_DESIGN_SYSTEM.md` | **Como** a página se apresenta (largura, tokens, módulos) |
| `MANUAL_DIRECAO_VISUAL.md` | **Ritmo e composição** da leitura (alternância de blocos, escaneabilidade) |
| `MANUAL_PAGINA_DECISAO.md` | **O que** a página de decisão contém e em que ordem |

Os três se complementam. Nenhum substitui o outro.

### 3.5 Ritmo vertical do modelo comercial (página-padrão)

Página de referência comercial: Fogão 5 bocas (home + hub `/melhores/melhor-fogao-5-bocas`).  
Tokens de ritmo editorial em páginas `/melhores/` com módulos comerciais: escopo `.guide-editorial`.

| Token | Uso |
|-------|-----|
| `--editorial-stack` (4.5rem) | Entre módulos editoriais (justificativas → seções H2 → FAQ) |
| `--editorial-stack-close` (6rem) | Antes do bloco de relacionados (encerramento) |
| `--editorial-h2-after` (1.2rem) | Título H2 → texto introdutório |
| `--editorial-intro-to-body` (1.25rem) | Introdução → lista/corpo do módulo |
| `--editorial-faq-after-title` (1.55rem) | H2 FAQ → primeira pergunta |
| `--editorial-measure` (38rem) | Medida de leitura das seções H2→FAQ, ancorada à esquerda do shell `80rem` |

FAQ: sem mudança de layout; apenas respiro entre pergunta/resposta e entre itens, com hierarquia discreta no `dt`.

### 3.6 Estado atual do código (diagnóstico)

Hoje coexistentes:

- Shell home: `max-w-7xl`  
- Artigos/guias: `max-w-2xl` / `max-w-3xl` + override CSS (~52–61rem)  
- Exceção: hero do guia 4 bocas com breakout `w-screen`

Isso **contradiz** o Princípio 2 e deve ser unificado na implementação futura — sem Full Width de prosa.

---

## 4. Plano de implementação (somente quando autorizado)

1. **Fase 0** — Fixar valor de `--editorial-shell` e escala de ritmo vertical  
2. **Fase 1** — Criar token + `EditorialContainer` (sem migrar páginas)  
3. **Fase 2** — Piloto: Melhor Fogão 4 Bocas (remover breakout pontual)  
4. **Fase 3** — Guias / reviews / comparativos  
5. **Fase 4** — Blog + institucionais  
6. **Fase 5** — Home (normalizar literais para o token)  
7. **Fase 6** — Limpar overrides CSS e atualizar `editorialImageSpecs` (`sizes`)  

Cada fase: QA visual + checagem leve de LCP/CLS.

---

## 5. O que não fazer

- Não adotar Full Width de conteúdo editorial  
- Não alongar prosa sem controle de contexto  
- Não criar segundo “container oficial” paralelo  
- Não redesenhar componentes em tarefa só de conteúdo  
- Não alterar Header/Footer/grid global sem consultar este manual  
- Não implementar Layout Editorial Amplo “só em uma página” como padrão permanente sem plano de unificação  

---

## 6. Checklist antes de mudança estrutural de design

- [ ] Este manual foi lido  
- [ ] A mudança reforça portal editorial (não blog/loja)  
- [ ] Respeita Container Único + Largura por Contexto  
- [ ] Não introduz Full Width de prosa  
- [ ] Ritmo vertical considerado (não gap aleatório)  
- [ ] Escaneabilidade preservada ou melhorada  
- [ ] Impacto em componentes compartilhados mapeado  
- [ ] `CHANGELOG.md` será atualizado se a regra mudar  
- [ ] Se for mudança de conteúdo afiliado, cruzar com `MANUAL_PAGINA_DECISAO.md`  

---

## 7. Objetivo final

O Layout Editorial Amplo é característica **permanente** do Casa Prática Eletro.

No futuro, o visitante deve reconhecer o portal pela:

- organização visual  
- distribuição dos módulos  
- conforto de leitura  
- qualidade editorial  
- facilidade para decidir  

**Muda o produto. Não muda o DNA visual.**
