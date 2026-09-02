# MANUAL EDITORIAL — PÁGINA DE DECISÃO
## Casa Prática Eletro

**Status:** Documentação permanente — **único** manual editorial de páginas comerciais  
**Caminho canônico:** `docs/MANUAL_PAGINA_DECISAO.md`  
**Modelo oficial:** Fogão 5 bocas (configuração geral do cluster)

Este arquivo funde o que antes se chamava “artigo afiliado” e “página de decisão”.  
São o mesmo tipo de página. **Não existe outro manual editorial** para esse formato.

Consulte-o antes de criar ou reestruturar qualquer Página de Decisão.  
Quando uma regra mudar, **atualize este arquivo** (nunca crie “versão 2” nem manuais paralelos).

Identidade visual, containers, grids e ritmo técnico: ver `MANUAL_DESIGN_SYSTEM.md` (SSOT de Design System).  
Composição e ritmo de leitura: ver `MANUAL_DIRECAO_VISUAL.md`.  
Este manual define **conteúdo e fluxo**; aqueles definem **apresentação e composição**.

---

# Nome único

**Página de Decisão** = **artigo afiliado comercial**.

Um só tipo. Um só manual. Este arquivo.

Modelo oficial para novas criações: **toda a configuração geral do Fogão 5 bocas** (home + hub + satélites + reviews + dados de afiliado).

---

# Objetivo

Toda Página de Decisão deve permitir que o visitante escolha o produto ideal de forma rápida, segura e com confiança.

Não escrevemos artigos longos.

Construímos páginas que ajudam o usuário a tomar uma decisão de compra.

| Prioridade | Função |
|------------|--------|
| 1ª | Decidir qual modelo comprar |
| 2ª | Chegar ao CTA com confiança |
| 3ª | Autoridade SEO (sem volume desnecessário) |

**Pergunta única da página:**

> Qual produto devo comprar e por quê?

Cada bloco deve responder uma pergunta do comprador.  
Cada rolagem deve representar um avanço na decisão — nunca um novo capítulo.

Educação profunda fica no **Blog** e em satélites. Aqui: **resumo + link**.

---

# Filosofia Editorial

A página deve ser escaneável.

O usuário precisa entender rapidamente:

- quais são os melhores modelos;
- qual modelo atende seu perfil;
- por que confiar na recomendação;
- onde comprar.

Sempre priorizar decisão.  
Nunca quantidade de texto.

### Fluxo mental do visitante

```text
Ver ranking → Comparar ofertas → Entender o porquê de cada medalha →
Bater com o perfil → Validar a compra → (Opcional) Aprofundar → FAQ → Comprar
```

---

# Fluxo Oficial da Página

Toda Página de Decisão deve seguir esta sequência.

**Não alterar esta ordem** sem decisão explícita do projeto + atualização deste manual.

```text
1. Hero (título + box de ranking + lead curto + foto)
2. Intro (1 linha de ação) — markdown, antes dos cards
3. Cards comerciais
4. Tabela comparativa
5. Reviews / justificativas do ranking (3 blocos — um por medalha)
6. Como avaliamos
7. Qual produto para cada perfil
8. Antes de comprar
9. Aprofundar
10. FAQ (frontmatter)
11. Artigos relacionados (template)
```

---

## 1. Hero

Apresentação do ranking.

Título otimizado para SEO.

Imagem principal.

**Resumo rápido** (box com 3 linhas: 🥇 / 🥈 / 🥉), no modelo da home (`Hero.astro` — Fogão 5 bocas).

O visitante deve entender o ranking em poucos segundos.

**O ranking vive só no Hero.**  
Não repetir ranking em tabela, prosa ou “resumo” no corpo.

---

## 2. Intro

Uma linha de ação, no markdown, antes dos cards.

Sem filosofia. Sem meta-texto sobre o framework.

---

## 3. Cards comerciais

Apresentação visual dos modelos.

Nunca alterar sua função comercial.

Referência de implementação: cards da home (`HomeTopProducts.astro`) com os SKUs de Fogão 5 bocas.

---

## 4. Tabela comparativa

Comparação objetiva.

Evitar textos longos antes ou depois da tabela.

Referência: `HomeComparisonTable.astro` (mesmo padrão comercial da home 5 bocas).

---

## 5. Reviews (justificativas do ranking)

Existem apenas para **justificar** o ranking.

Nunca devem parecer três artigos consecutivos.

Os 3 blocos **defendem a medalha**, não apresentam o produto do zero.

Cada bloco deve conter apenas:

- breve apresentação (1 linha: o critério da medalha);
- principais vantagens (2–3 provas — info **nova** vs. hero/cards/tabela);
- principais limitações (1 limitação ou fronteira de uso);
- para quem indicamos;
- CTA de compra.

Molde por modelo:

```text
### 🥇 Por que o [Modelo] é o [papel no ranking]
1 linha: o critério da medalha
- 2–3 provas (info nova vs. hero/cards/tabela)
- 1 limitação ou fronteira de uso
[CTA]
```

Proibido nos blocos de justificativa:

- “Vale o investimento?”
- “Quando NÃO recomendamos” longo
- Reexplicar benefícios já listados nos cards
- Capítulos de especificações

Evitar textos longos. Priorizar listas curtas.

Análises individuais longas ficam nas **reviews** do cluster (ex.: `/review-fogao-5-bocas-[marca]`), não nesta página.

---

## 6. Como avaliamos

Bloco curto. Vem **depois** das justificativas.

No máximo uma frase ou poucos bullets.

Mostra o critério que muda a leitura do ranking (1 ideia nova + bullets curtos).

Objetivo: reforçar credibilidade.  
Nunca virar capítulo. Sem metodologia em capítulos.

---

## 7. Qual produto para cada perfil

Lista simples. Perfil → modelo.

Regra de empate: entregar **quando escolher A vs B** em dúvida.

Não repetir o ranking. Sem repetir argumentos.

---

## 8. Antes de comprar

Checklist rápido. Itens objetivos.

Só o que **impede** erro na compra (medidas, gás, preço real, tamanho de categoria).

Não relistar features do produto.  
Nunca desenvolver explicações longas.

---

## 9. Aprofundar

Quando existir artigo específico:

- resumir em uma linha;
- direcionar para link interno.

Formato: `dúvida residual → link`.

Sem mini-artigos. Sem “leia também” genérico no corpo se o bloco Aprofundar já cumpre o papel.

Jamais transformar a Página de Decisão em um guia completo sobre o assunto.

---

## 10. FAQ

No frontmatter. Objetivo.

Responder apenas dúvidas que ajudam na decisão.

Evitar perguntas educativas que desviem do objetivo da página.  
Não reescrever o ranking em prosa.

---

## 11. Artigos relacionados

Encerrar a jornada editorial (via template).

---

# Ranking padrão

Três papéis claros (adaptar nomes à categoria):

| Papel | Função | Exemplo (Fogão 5 bocas) |
|-------|--------|-------------------------|
| Melhor geral | Escolha segura para a maioria | Electrolux FE5IG |
| Melhor premium / categoria | Quem paga acabamento / experiência | (adaptar) |
| Melhor custo-benefício | Menor investimento consciente | Brastemp BFS5NCR |

Na home 5 bocas o terceiro papel pode ser “Mais vendido” quando fizer sentido comercial (ex.: Consul CFS5NAB).

O box do hero **declara** o ranking.  
O corpo **justifica**. Não re-rankeia.

---

# Regras de Escrita

Escrever para quem deseja comprar.  
Nunca para quem deseja estudar.

Parágrafos curtos. Frases curtas.  
Listas sempre que possível.

### Teste de corte

> Se eu remover esta seção, o visitante decide pior?

Se a resposta for não → cortar.

---

# Repetição

Cada argumento deve aparecer apenas uma vez.

Se já está no hero, nos cards ou na tabela, a seção seguinte **não repete** — acrescenta algo novo ou some.

Nunca repetir:

- introdução;
- ranking (já declarado no hero);
- reviews / justificativas;
- conclusão;
- FAQ.

Se um benefício já foi explicado, apenas faça referência a ele.

---

# CTAs e afiliados

- CTAs nos **cards**, na **tabela** e ao fim de **cada justificativa**
- Texto padrão do projeto (ML / Shopee)
- Não inventar componentes de botão
- Links em `products` / `commercialGuideBlocks` — markdown não substitui essa camada
- Preservar âncora `#analises-detalhadas` quando os cards apontarem para ela
- Fonte de afiliados do modelo 5 bocas: `src/data/products.ts` (Brastemp, Consul, Electrolux)

## Gate — produto/marca sem afiliado de fabricante

Antes de publicar página de decisão que nomeie produto ou marca **sem programa de afiliados direto**, verificar se dá para monetizar pelos programas de **varejistas**, especialmente **Shopee** e **Mercado Livre**.

1. Checar oferta rastreável no painel ML (CTA principal) e no painel Shopee (CTA secundário).
2. Se houver: cadastrar em `src/data/products.ts` com `mlGeneratedByPanel` / `shopeeGeneratedByPanel` e ligar os CTAs pelo inventário.
3. Se não houver: omitir o CTA daquele SKU (ou não incluí-lo no ranking comercial), registrar a lacuna e avisar no relatório.

**Exemplo:** Atlas não tem afiliado de fabricante; `atlasMonacoPlus` e `atlasAtenasGlass` monetizam via ML + Shopee. Não excluir um SKU do ranking só porque o fabricante não tem programa próprio.

Não inventar URL (link orgânico, busca genérica, short link quebrado). Não publicar CTA sem confirmação no painel.

Regra de agente: `.cursor/rules/monetizacao-paginas-decisao.mdc`.

---

# Links Internos e satélites

Sempre que existir um artigo satélite:

Não explicar. Resumir. Linkar.

Exemplos no cluster 5 bocas: como escolher; 4 ou 5 bocas; custo-benefício; vale a pena.

| Manter na página | Empurrar para satélite |
|------------------|------------------------|
| Ranking nomeado | Guias “como escolher” longos |
| Justificativas curtas | Comparativos de categoria profundos |
| FAQ de decisão | Tutoriais / cuidados / vida útil |
| Links internos | Qualquer capítulo educativo |

Estratégia: **página de decisão + artigos satélites**.

---

# Layout / arquitetura (limites)

Em tarefa editorial **não**:

- Criar componentes novos
- Alterar CSS/template “de passagem”
- Mudar menu, rotas ou arquitetura global

Exceções (já validadas no modelo Fogão 5 bocas / home, só com pedido explícito):

- Hero com texto + foto + box de ranking
- Cards + tabela comerciais no fluxo
- Cluster hub + satélites + reviews

---

# O que NÃO fazer

- Transformar reviews em mini-artigos
- Criar capítulos educativos longos
- Repetir o ranking diversas vezes
- Explicar o mesmo benefício em vários blocos
- Criar paredes de texto
- Escrever apenas para SEO
- Esquecer a intenção comercial
- Colocar “Como avaliamos” antes da decisão
- Desenvolver satélite dentro da página
- Afastar CTAs da escolha
- Inventar UI nova em tarefa de conteúdo
- Criar framework paralelo em outro arquivo
- Tratar “artigo afiliado” e “página de decisão” como tipos diferentes

---

# Checklist de publicação

- [ ] Este manual consultado antes de estruturar
- [ ] Ordem = fluxo oficial acima
- [ ] Ranking só no hero (box), não repetido no corpo
- [ ] Intro = 1 linha
- [ ] 3 justificativas com **info nova** cada
- [ ] Como avaliamos depois das justificativas
- [ ] Perfil = regra de empate (não eco do ranking)
- [ ] Antes de comprar = bloqueios reais
- [ ] Aprofundar = dúvida → link
- [ ] FAQ no frontmatter
- [ ] CTAs nos blocos de decisão
- [ ] Cluster espelhado no modelo Fogão 5 bocas (hub + satélites + reviews)
- [ ] Nenhuma seção “só para aumentar texto”
- [ ] Nenhum mini-artigo disfarçado de review

---

# Como nascer uma nova Página de Decisão

Espelhar o **cluster Fogão 5 bocas**. Não reinventar o funil.

1. Definir categoria + 3 papéis do ranking  
2. Mapear o cluster (hub + satélites + reviews), como no 5 bocas  
3. Preencher hero (box) + cards/tabela (dados em `products` / bloco comercial)  
4. Escrever 3 justificativas (info nova)  
5. Como avaliamos → Perfil → Antes de comprar → Aprofundar  
6. FAQ objetivo  
7. Rodar o checklist de publicação  

**Não** partir de um artigo longo para “encurtar depois”.

---

# Princípio Fundamental

Uma Página de Decisão não ensina tudo.

Ela ajuda o usuário a decidir.

Quando surgir uma dúvida específica, a resposta deve estar em um artigo satélite.

A Página de Decisão permanece leve, objetiva e focada na conversão.

---

# Regra de Ouro

Cada rolagem da página deve representar uma decisão.

Nunca um novo capítulo.

Ao revisar qualquer página, perguntar sempre:

> Este bloco ajuda o usuário a decidir ou apenas aumenta o texto?

Se não ajudar na decisão, resumir ou mover para um artigo satélite.

Cada seção só permanece se **acrescentar** informação nova à decisão de compra.

---

# Modelo de referência — Fogão 5 bocas

Toda nova Página de Decisão (novo produto / nova categoria) deve espelhar a **estrutura do Fogão 5 bocas**, construída desde o início neste formato.

### Superfície comercial (home)

```text
Hero (ranking 5 bocas) → Cards → Tabela comparativa → guia / satélites
```

Arquivos:

- `src/components/Hero.astro`
- `src/components/HomeTopProducts.astro`
- `src/components/HomeComparisonTable.astro`
- `src/pages/index.astro`

### Hub (Página de Decisão da categoria)

- Rota: `/melhores/melhor-fogao-5-bocas`
- Conteúdo: `src/content/melhores/melhor-fogao-5-bocas.md`
- Template: `src/pages/melhores/[slug].astro`

### Satélites do cluster

| Página | Função |
|--------|--------|
| `/como-escolher-fogao-5-bocas` | Critérios (não ranking) |
| `/comparativo-fogao-4-vs-5-bocas` | Decisão de formato |
| `/fogao-5-bocas-custo-beneficio` | Ângulo preço/valor |

### Reviews individuais

| Página | Função |
|--------|--------|
| `/review-fogao-5-bocas-[marca]` | Análise por marca (Brastemp, Consul, Electrolux) |
| `/brastemp-bfs5ncr-vale-a-pena` | Review longa / FAQ de produto |

### Dados de afiliado

- `src/data/products.ts` — Brastemp BFS5NCR, Consul CFS5NAB, Electrolux FE5IG

### Fluxo de decisão (resumo)

```text
Home / Hub: ranking → ofertas → tabela
→ Justificativas curtas (na Página de Decisão)
→ Perfil / antes de comprar / aprofundar (satélites sob demanda)
→ Reviews individuais quando o visitante já escolheu a marca
→ FAQ → Relacionados
```

Novas categorias repetem este funil: **hub de decisão + satélites + reviews + dados de afiliado**, sem inventar arquitetura paralela.
