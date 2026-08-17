# GUIA EDITORIAL — AFILIADOS DE ELETRODOMÉSTICOS E RECOMENDAÇÕES DO GOOGLE
## Casa Prática Eletro

**Status:** Documento interno obrigatório — padrão editorial para conteúdo comercial/afiliado  
**Caminho canônico:** `docs/GUIA_EDITORIAL_AFILIADOS_ELETRODOMESTICOS_GOOGLE.md`  
**Data de elaboração:** 2026-08-09  
**Escopo desta etapa:** pesquisa + análise + padrão (sem produção de artigos, sem alteração de páginas/código)

---

## AVISO OBRIGATÓRIO PARA FUTUROS AGENTES

> **Este documento é obrigatório como referência antes da arquitetura de qualquer novo conteúdo comercial ou afiliado do Casa Prática Eletro.**

O agente **NÃO** deve simplesmente começar a escrever um artigo.

Primeiro deve:

```text
PESQUISAR
→ ANALISAR INTENÇÃO
→ VERIFICAR ARQUITETURA EXISTENTE
→ IDENTIFICAR RISCOS
→ DEFINIR CONTRIBUIÇÃO ORIGINAL
→ DEFINIR FUNÇÃO COMERCIAL
→ PROPOR ARQUITETURA
→ AGUARDAR APROVAÇÃO
→ SÓ ENTÃO PRODUZIR
```

Documentos relacionados (não substituem este guia):

| Documento | Função |
|-----------|--------|
| `docs/MANUAL_EDITORIAL.md` | Identidade, tom e ética de recomendação |
| `docs/MANUAL_PAGINA_DECISAO.md` | Fluxo e estrutura da Página de Decisão |
| `docs/MANUAL_SEO.md` / `docs/seo-rules.md` | Regras técnicas de SEO do projeto |
| Este arquivo | Tradução das recomendações oficiais do Google + padrão afiliado para eletrodomésticos BR |

---

## Como ler este documento (legenda de autoridade)

Em todo o texto, as afirmações são classificadas assim:

| Etiqueta | Significado |
|----------|-------------|
| **[OFICIAL]** | Orientação explícita da documentação Google Search Central / developers.google.com / suporte oficial |
| **[INTERPRETAÇÃO]** | Leitura estratégica da orientação oficial aplicada a sites afiliados de produtos físicos |
| **[CPE]** | Regra editorial própria do Casa Prática Eletro (não é “regra do Google”) |

**Regra de honestidade:** não inventar recomendações do Google. Quando algo for decisão humana do projeto, marcar como **[CPE]**.

---

# 1. Objetivo

Estabelecer como o Casa Prática Eletro deve produzir conteúdo sobre eletrodomésticos de forma que satisfaça **simultaneamente**:

```text
GOOGLE
↓
RELEVÂNCIA + QUALIDADE + UTILIDADE
↓
USUÁRIO
↓
CONFIANÇA + DECISÃO
↓
CLIQUE
↓
COMPRA
↓
RECEITA AFILIADA
```

A monetização deve ser **consequência** da utilidade e da confiança — não o motivo principal da existência da página.

### Princípio comercial obrigatório **[CPE]**

```text
PRIMEIRO: ajudar o usuário a entender e decidir.
DEPOIS: oferecer o caminho para compra.
```

**Teste obrigatório (Teste da Página Sem Monetização):**

> Se retirarmos todos os links afiliados desta página, ela ainda terá valor suficiente para ajudar alguém a tomar uma decisão?

- Se **SIM** → a página pode seguir para arquitetura/produção.  
- Se **NÃO** → o conteúdo precisa ser reconsiderado antes de qualquer redação.

---

# 2. Fontes oficiais pesquisadas

Fontes primárias consultadas (prioridade absoluta):

| Tema | Fonte oficial |
|------|----------------|
| People-first / helpful content / E-E-A-T / Who-How-Why | [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| Reviews system | [Google Search's reviews system](https://developers.google.com/search/docs/appearance/reviews-system) |
| Como escrever reviews de qualidade | [Write high quality reviews](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews) |
| Thin affiliation / spam / scaled content / link schemes | [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) |
| Search Essentials | [Google Search Essentials](https://developers.google.com/search/docs/essentials) |
| Conteúdo com IA generativa | [Using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) e [Google Search and AI-generated content (blog)](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content) |
| Links afiliados / `rel="sponsored"` | [Qualify outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) e seção de link schemes em Spam policies |
| Links rastreáveis e internos | [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) |
| Estrutura de site e-commerce / descoberta | [Help Google understand your ecommerce site structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure) |
| Product structured data | [Intro to Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product) e [Product snippet](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) |
| Review / AggregateRating | [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) |
| Datas e atualização | [Help Google know the best date](https://developers.google.com/search/blog/2019/03/help-google-search-know-best-date-for) |
| Sistemas de ranking (incl. freshness / helpful content) | [A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide) |
| Valor em programas de afiliados (histórico) | [Affiliate programs and added value (2014)](https://developers.google.com/search/blog/2014/01/affiliate-programs-and-added-value) |
| Product review updates (contexto) | [Improving Product Review ranking, one year on](https://developers.google.com/search/blog/2022/03/product-review-ranking-one-year-on) |

**Complementar (não autoridade primária):** guidelines de Search Quality Raters (usadas por avaliadores humanos para treinar/avaliar sistemas; **não são guia direto de ranking**, segundo o próprio Google).

---

# 3. Princípios do Google traduzidos para o projeto

## 3.1 People-first content **[OFICIAL → INTERPRETAÇÃO → CPE]**

**[OFICIAL]** O Google prioriza conteúdo criado para beneficiar pessoas, não para manipular rankings. Perguntas-chave incluem: há público real? há expertise/experiência de primeira mão? o site tem propósito claro? o leitor sai com informação suficiente e experiência satisfatória?

**[INTERPRETAÇÃO]** Para afiliados, “people-first” significa que a página existe para reduzir incerteza de compra — não para empilhar keywords e CTAs.

**[CPE]** Toda página comercial do CPE deve responder, no topo da arquitetura: *qual dúvida concreta do brasileiro comprando eletrodoméstico esta URL resolve?*

## 3.2 Evitar search-engine-first **[OFICIAL → CPE]**

**[OFICIAL]** Sinais de alerta: conteúdo feito principalmente para atrair buscas; produção em massa em muitos tópicos; automação extensiva; só resumir terceiros; escrever por contagem de palavras; datar como “fresco” sem mudança real; entrar em nicho só por tráfego.

**[CPE]** Proibido criar URL só porque existe variação de keyword. Proibido “atualizar data” sem mudança substancial.

## 3.3 E-E-A-T (Experience, Expertise, Authoritativeness, Trust) **[OFICIAL → CPE]**

**[OFICIAL]** Sistemas usam fatores que identificam experiência, expertise, autoridade e confiança. **Trust é o mais importante.** E-E-A-T em si não é um “fator único de ranking”, mas alinhamento com E-E-A-T é o que os sistemas buscam recompensar. Who / How / Why são o framework de autoavaliação.

**[CPE]** Em eletrodomésticos:

| Dimensão | Como demonstrar no CPE |
|----------|-------------------------|
| Experience | Uso real, fotos/vídeos próprios, medições, instalação observada — **somente quando for verdade** |
| Expertise | Critérios técnicos traduzidos (consumo, capacidade, manutenção, assistência) |
| Authority | Consistência temática do site (foco em eletrodomésticos), links internos de cluster, fontes citadas |
| Trust | Limitações honestas, transparência afiliada, ausência de urgência falsa, correção de erros |

## 3.4 Reviews system **[OFICIAL → INTERPRETAÇÃO]**

**[OFICIAL]** O sistema de reviews recompensa análise aprofundada e pesquisa original de especialistas/entusiastas; evita conteúdo fino que só resume produtos. Aplica-se a artigos, posts e páginas first-party com recomendação/opinião/análise (inclui rankings e head-to-head). Em português, o sistema está listado entre os idiomas cobertos. Em sites com volume alto de reviews, a avaliação pode ter efeito site-wide.

**[INTERPRETAÇÃO]** Rankings “melhores X” e comparativos do CPE estão sob o mesmo padrão de qualidade de reviews — não são “páginas de SEO leves”.

## 3.5 Thin affiliation **[OFICIAL → CPE]**

**[OFICIAL]** Thin affiliation = páginas com links afiliados cujas descrições/reviews são copiadas do merchant sem conteúdo original ou valor adicional; ou redes cookie-cutter. **Nem todo afiliado é thin.** Exemplos de bom valor: informação adicional de preço, reviews originais, testes rigorosos e ratings, navegação útil de categorias, comparações de produtos.

**[CPE]** Qualquer página cujo valor principal seja “descrição de marketplace + botão comprar” é inviável. Ver seção 5.

## 3.6 Conteúdo com IA **[OFICIAL → CPE]**

**[OFICIAL]** IA não é proibida. Usar automação/IA **principalmente para manipular rankings** viola spam (scaled content abuse). Foco em qualidade, precisão, relevância. Disclosures de “como foi criado” quando o leitor razoavelmente perguntaria. Não listar “IA” como autor.

**[CPE]** IA pode ajudar em pesquisa, estrutura e rascunho. **Não** pode publicar páginas em massa sem contribuição editorial humana, critérios próprios e verificação factual brasileira.

## 3.7 Atualização e datas **[OFICIAL → CPE]**

**[OFICIAL]** Não mudar data para parecer fresco sem mudança substancial. Em atualizações significativas, atualizar data visível; usar `datePublished` / `dateModified` quando aplicável.

**[CPE]** Em eletrodomésticos, atualização substancial inclui: mudança de linha/modelo, preço/disponibilidade materialmente diferente, alteração de recomendação, novos critérios (ex.: selo, consumo), correção de erro factual.

---

# 4. Regras para afiliados de alta qualidade

## 4.1 O que caracteriza conteúdo afiliado de alta qualidade **[OFICIAL + CPE]**

Com base nos exemplos oficiais de valor adicional e nas best practices de reviews:

1. **Análise original** (não paráfrase de ficha técnica).  
2. **Critérios explícitos de decisão** (por que X, não Y).  
3. **Vantagens e limitações**.  
4. **Comparação útil** (não lista decorativa).  
5. **Contexto de uso** (perfil, espaço, família, rotina).  
6. **Informação de preço/custo-benefício além do “comprar aqui”**.  
7. **Evidência** (quando houver) ou **honestidade** (quando não houver).  
8. **Navegação e links internos** que ajudam a completar a jornada.  
9. **Utilidade residual sem links afiliados** (teste obrigatório).  
10. **Transparência** sobre relação comercial.

## 4.2 Respostas práticas às 20 perguntas estratégicas

### 1) O que caracteriza conteúdo afiliado de alta qualidade?
**[CPE]** Página que ensina a decidir e justifica recomendações com critérios verificáveis; links comerciais são caminho, não o conteúdo.

### 2) O que caracteriza thin affiliate?
**[OFICIAL]** Cópia/reescreita rasa do merchant + links, sem valor original; templates repetidos em rede.  
**[CPE]** Também tratamos como thin: ranking sem critério; “melhores” sem justificativa; specs coladas; CTA saturando a página; páginas-clone por keyword.

### 3) Como uma página de “melhor produto” deve demonstrar análise real?
**[OFICIAL]** Explicar *por que* é o melhor (geral ou para um uso), com evidência de primeira mão quando possível; listas ranqueadas devem se sustentar sozinhas.  
**[CPE]** Exigir: critérios → shortlist → para quem serve / não serve → limitações → comparação mínima → recomendação.

### 4) Como justificar a escolha de um produto?
**[CPE]** Sempre amarrar a: critério dominante + perfil de usuário + trade-off aceito. Proibido “melhor” sem “melhor para quê”.

### 5) Como apresentar vantagens E limitações?
**[OFICIAL]** Discutir benefícios e desvantagens com base em pesquisa original. Product snippets editoriais podem usar `positiveNotes` / `negativeNotes`.  
**[CPE]** Toda recomendação forte precisa de pelo menos uma limitação honesta (ruído, tamanho, manutenção, assistência, consumo, preço, etc.).

### 6) Como utilizar especificações sem copiar fabricante/marketplace?
**[CPE]** Specs são insumos, não texto. Traduzir: o que muda no dia a dia, o que é marketing, o que é requisito (voltagem, medidas, capacidade). Citar origem quando necessário; nunca republicar ficha inteira.

### 7) Como demonstrar experiência quando houver experiência direta?
**[OFICIAL]** Evidência visual/áudio/links da própria experiência; medições quantitativas; método de teste.  
**[CPE]** Declarar o que foi feito (ex.: uso por X semanas, instalação observada, medição de consumo aproximada) e o que **não** foi feito.

### 8) Como NÃO fingir experiência quando ela não existir?
**[OFICIAL]** Who/How/Why e E-E-A-T valorizam transparência; reviews falsos/não baseados em experiência genuína violam guidelines de review snippets.  
**[CPE]** Usar formulações honestas: “com base em análise de especificações, manuais, histórico de assistência e feedback agregado de usuários”, nunca “testamos” se não testamos. Preferir expertise metodológica a teatro de unboxing.

### 9) Como utilizar dados e comparações?
**[CPE]** Comparar só o que muda a decisão (capacidade, eficiência, ruído, dimensões, manutenção, preço relativo). Evitar tabelas ornamentais. Declarar data de referência dos dados.

### 10) Como trabalhar preço e custo-benefício?
**[OFICIAL]** Informação adicional de preço é exemplo de valor em afiliados.  
**[CPE]** Preço em BRL como faixa/relativo (“entrada / intermediário / premium”), não como “preço exato eterno”. Parcelamento e frete quando relevantes à decisão. Custo de uso (energia, filtros, peças) > preço de etiqueta isolado.

### 11) Como adaptar para o consumidor brasileiro?
Ver seção 11 (Realidade brasileira).

### 12) Como utilizar links afiliados sem virar catálogo?
**[CPE]** Limitar densidade comercial; CTA após critério/recomendação; no máximo um caminho de compra claro por bloco de decisão; conteúdo informativo continua sendo o corpo.

### 13) Como estruturar CTAs?
**[CPE]** CTA = próximo passo lógico (“ver oferta atual”, “comparar no marketplace”), não pressão. Após confiança, não no meio da dúvida não resolvida.

### 14) Como tratar comparativos?
**[CPE]** Dois a quatro modelos com diferença real de perfil. Explicitar critério de desempate. Evitar “A vs B” sem usuário-alvo.

### 15) Como tratar reviews de modelos?
**[OFICIAL]** Best practices de high-quality reviews.  
**[CPE]** Review = análise de um SKU/modelo; deve apontar para ranking/guia do cluster e vice-versa.

### 16) Como tratar rankings?
**[OFICIAL]** Listas ranqueadas precisam de conteúdo útil suficiente para se manterem sozinhas.  
**[CPE]** Ranking sem metodologia = spam editorial. Metodologia curta + medalhas justificadas + limites do ranking.

### 17) Quando uma nova página realmente merece existir?
**[CPE]** Só se houver intenção dominante distinta, público distinto, e contribuição original não coberta por página existente (ou se atualização/consolidação for inferior).

### 18) Como evitar canibalização?
Ver seção 17.

### 19) Como conectar artigos informativos às páginas de decisão?
**[CPE]** Informativo resolve “entender”; decisão resolve “escolher”. Links contextuais nos dois sentidos (hub ↔ satélite ↔ review).

### 20) Como o conteúdo ajuda efetivamente a comprar?
**[CPE]** Seguindo o funil: Busca → Resposta → Critérios → Comparação → Recomendação → Confiança → CTA → Clique → Compra — sem manipulação.

---

# 5. Regras contra thin affiliate

## 5.1 Definição operacional CPE **[OFICIAL + CPE]**

Uma página é tratada como **risco thin affiliate** se um ou mais forem verdadeiros:

| Sinal | Por quê |
|-------|---------|
| Descrição essencialmente igual à do merchant | Sem valor original **[OFICIAL]** |
| Só lista produtos + botões | Sem análise **[INTERPRETAÇÃO]** |
| Ranking sem critérios | Não ajuda decisão **[CPE]** |
| Múltiplas URLs quase idênticas | Cookie-cutter **[OFICIAL/INTERPRETAÇÃO]** |
| Specs copiadas em bloco | Zero transformação **[CPE]** |
| Falha no Teste da Página Sem Monetização | Monetização = conteúdo **[CPE]** |
| Produção em massa por IA/template sem cuidado editorial | Scaled content abuse risk **[OFICIAL]** |

## 5.2 Checklist anti-thin (mínimo) **[CPE]**

Antes de publicar qualquer página afiliada:

- [ ] Há contribuição original explícita (critério, comparação, contexto de uso, ou evidência).  
- [ ] Há limitações honestas.  
- [ ] Há “para quem serve / não serve”.  
- [ ] Specs foram traduzidas, não coladas.  
- [ ] A página sobrevive sem links afiliados.  
- [ ] Não é clone de outra URL do site.  
- [ ] Transparência de afiliado presente.

Se 2+ itens falharem → **não publicar**.

---

# 6. Regras de originalidade

**[OFICIAL]** Conteúdo deve oferecer informação, pesquisa ou análise original; se usa outras fontes, não apenas copiar/reescrever — agregar valor substancial.

**[CPE] Formas aceitas de originalidade no CPE (mesmo sem lab próprio):**

1. Metodologia de escolha clara e própria.  
2. Matriz de decisão por perfil brasileiro.  
3. Tradução de specs em consequências práticas.  
4. Síntese crítica de trade-offs (não “resumo positivo”).  
5. Comparações head-to-head com desempate.  
6. Cobertura de assistência, peças, voltagem, espaço.  
7. Experiência direta documentada (quando existir).  
8. Atualizações editoriais com mudança real de recomendação.

**Proibido como “originalidade”:** reordenar bullet points do marketplace; sinônimos de descrição oficial; listas geradas só para cobrir keywords.

---

# 7. Regras de experiência e evidência

## 7.1 Hierarquia de evidência **[CPE]**

| Nível | Tipo | Uso editorial |
|-------|------|----------------|
| A | Experiência direta documentada (uso, instalação, medição, fotos próprias) | Pode afirmar “testamos / usamos” |
| B | Expertise analítica (manuais, specs cruzadas, histórico de linha, critérios técnicos) | Afirmar “analisamos / comparamos com base em…” |
| C | Sinais agregados de usuários (padrões recorrentes, com cautela) | Usar como apoio, nunca como prova única |
| D | Material de fabricante/marketplace | Insumo; sempre reinterpretar |

## 7.2 Comunicação honesta sem experiência direta **[CPE]**

Usar:

- “Com base em análise de especificações e critérios de uso…”  
- “Não realizamos teste laboratorial próprio deste modelo; a recomendação considera…”  

Evitar:

- “Colocamos à prova”, “aprovado pela nossa equipe”, “testamos por 30 dias” — se falso.  
- Fotos de stock apresentadas como evidência de teste.

## 7.3 Quando houver experiência direta **[OFICIAL + CPE]**

Declarar: o quê foi testado, por quanto tempo/contexto, método, limites do teste, resultados quantitativos quando possível, evidência visual própria.

---

# 8. Metodologia de intenção de busca

## 8.1 Tipos de intenção a classificar **[CPE]**

Antes de qualquer arquitetura, identificar a **intenção dominante**:

| Intenção | Pergunta do usuário | Tipo de página típico |
|----------|---------------------|------------------------|
| Informacional | “Como funciona / o que é / o que observar?” | Guia informativo / apoio |
| Investigação comercial | “O que considerar antes de comprar?” | Guia de compra |
| Comparação | “A ou B? Qual diferença?” | Comparativo |
| Decisão / “melhores” | “Qual comprar?” | Melhor produto / Ranking / Página de Decisão |
| Marca/modelo | “Vale o Modelo X?” | Review de modelo |
| Atributo | “Com função Y / Inverter / 5 bocas…” | Página por atributo |
| Orçamento/preço | “Barato / até R$…” | Faixa de preço |
| Problema/situação | “Para apartamento pequeno / família grande…” | Guia situacional ou atributo |
| Alternativa | “Similar ao X mais barato” | Comparativo / apoio |

## 8.2 Uma URL, uma função principal **[CPE]**

Cada URL deve ter **uma intenção dominante** e uma frase de função:

> “Esta URL existe para ________.”

Se a frase precisar de “e também / e também”, há risco de página confusa ou canibalização.

## 8.3 Gate de criação de URL **[CPE]**

Antes de criar nova URL, verificar:

1. Páginas existentes no cluster/tema.  
2. Intenção já atendida.  
3. Sobreposição de SERP/keyword/intenção.  
4. Possibilidade de **atualizar** página existente.  
5. Possibilidade de **consolidar** páginas fracas.  
6. Contribuição original clara.  
7. Função no cluster (hub, satélite, review, apoio).

**Não criar URL só porque existe variação de keyword.**

---

# 9. Metodologia de arquitetura

## 9.1 Sequência obrigatória do agente

```text
1. Pesquisa de intenção e SERP (o que o usuário espera)
2. Auditoria de URLs existentes do cluster
3. Decisão: criar / atualizar / consolidar / não fazer
4. Definição da contribuição original CPE
5. Definição de critérios e shortlist de produtos
6. Definição de evidência disponível (nível A–D)
7. Mapa de links internos (entrada e saída)
8. Decisão de schema aplicável (ou nenhum)
9. Proposta de arquitetura (outline)
10. Aprovação humana
11. Produção
12. Checklist pré-publicação
```

## 9.2 Função da URL no cluster **[CPE]**

| Papel | Função |
|-------|--------|
| Hub / Página de Decisão | Resolver “o que comprar” no tema |
| Satélite informativo | Resolver dúvidas que alimentam a decisão |
| Review | Aprofundar um modelo |
| Comparativo | Desempatar A vs B |
| Atributo / preço | Filtrar por restrição do usuário |
| Apoio | FAQ, manutenção, instalação, glossário |

---

# 10. Padrões por tipo de página

Para cada tipo: intenção, objetivo, estrutura, comercialidade, evidência, CTA, links internos, riscos, qualidade.

## A) Guia informativo

| Campo | Padrão **[CPE]** |
|-------|------------------|
| Intenção | Informacional |
| Objetivo | Ensinar conceitos/critérios sem forçar compra |
| Estrutura | Problema → conceitos → o que observar → erros comuns → próximo passo (link decisão) |
| Comercialidade | Baixa |
| Evidência | Expertise B + fontes |
| CTA | Suave: “ver guia de compra / melhores opções” |
| Links internos | Para guia de compra e página de decisão |
| Riscos | Virar texto genérico; keyword stuffing; CTA precoce |
| Qualidade | Leitor entende o tema sem precisar de outra aba imediatamente |

## B) Guia de compra

| Campo | Padrão **[CPE]** |
|-------|------------------|
| Intenção | Investigação comercial |
| Objetivo | Montar critérios antes da shortlist |
| Estrutura | Perfis de uso → critérios → trade-offs → checklist → caminho para ranking/reviews |
| Comercialidade | Média-baixa |
| Evidência | B/C; A se houver |
| CTA | “Ver recomendações atuais” |
| Links | Ranking, reviews, atributo/preço |
| Riscos | Misturar com ranking raso; repetir Página de Decisão |
| Qualidade | Usuário sai com critérios claros mesmo sem clicar afiliado |

## C) Página “melhor produto” / Página de Decisão

| Campo | Padrão **[CPE]** (alinhar a `MANUAL_PAGINA_DECISAO.md`) |
|-------|------------------|
| Intenção | Decisão |
| Objetivo | Responder “qual comprar e por quê” |
| Estrutura | Resposta rápida → critérios → ranking/recomendados → para quem → limitações → comparação → FAQ → CTA |
| Comercialidade | Alta, mas subordinada à utilidade |
| Evidência | Preferir A; no mínimo B com honestidade |
| CTA | Principal após confiança; secundários por produto |
| Links | Reviews, guia, comparativos, apoio |
| Riscos | Thin ranking; medalhas sem justificativa; catálogo |
| Qualidade | Passa no Teste da Página Sem Monetização |

## D) Ranking

| Campo | Padrão **[CPE]** |
|-------|------------------|
| Intenção | Decisão / investigação |
| Objetivo | Ordenar opções com metodologia |
| Estrutura | Metodologia → lista justificada → quando NÃO escolher o #1 → links reviews |
| Comercialidade | Alta |
| Evidência | A/B; rankings devem se sustentar sozinhos **[OFICIAL]** |
| CTA | Por posição, sem saturar |
| Links | Reviews individuais + guia |
| Riscos | Lista sem método; “top 10” inchado |
| Qualidade | Cada posição tem razão de existir |

## E) Comparativo

| Campo | Padrão **[CPE]** |
|-------|------------------|
| Intenção | Comparação |
| Objetivo | Desempatar 2–4 opções |
| Estrutura | Para quem compara → diferenças que importam → tabela enxuta → veredito por perfil |
| Comercialidade | Média-alta |
| Evidência | B/A nos pontos de diferença |
| CTA | Condicional (“se prioriza X, vá de…”) |
| Links | Reviews + ranking pai |
| Riscos | Comparar modelos sem overlap real de decisão |
| Qualidade | Veredito claro por cenário |

## F) Review de modelo

| Campo | Padrão **[CPE]** + **[OFICIAL]** |
|-------|------------------|
| Intenção | Marca/modelo |
| Objetivo | Vale a pena este modelo? |
| Estrutura | Veredito → para quem → specs traduzidas → prós/contras → alternativas → CTA |
| Comercialidade | Alta |
| Evidência | Máximo possível de A; senão B honesto |
| CTA | Oferta do modelo + alternativa |
| Links | Ranking pai, comparativos, guia |
| Riscos | Ficha técnica; review genérico reutilizável em qualquer SKU |
| Qualidade | Impossível trocar o nome do modelo sem reescrever o texto |

## G) Página por faixa de preço

| Campo | Padrão **[CPE]** |
|-------|------------------|
| Intenção | Orçamento |
| Objetivo | Melhor escolha dentro de restrição financeira |
| Estrutura | O que esperar na faixa → trade-offs → recomendações → quando subir/descer de faixa |
| Comercialidade | Alta |
| Evidência | B + contexto de preço BR |
| CTA | Por faixa |
| Links | Ranking geral, reviews |
| Riscos | Preço desatualizado como verdade absoluta; urgência falsa |
| Qualidade | Explica o que se perde/ganha na faixa |

## H) Página por atributo

| Campo | Padrão **[CPE]** |
|-------|------------------|
| Intenção | Atributo |
| Objetivo | Filtrar por feature/necessidade (ex.: inverter, 5 bocas, frost free) |
| Estrutura | O atributo importa? → para quem → opções → cuidados |
| Comercialidade | Média-alta |
| Evidência | B |
| CTA | Modelos que atendem o atributo |
| Links | Guia + ranking |
| Riscos | Página-clone do ranking geral |
| Qualidade | Só existe se o atributo muda a decisão de forma material |

## I) Conteúdo de apoio

| Campo | Padrão **[CPE]** |
|-------|------------------|
| Intenção | Problema / informacional |
| Objetivo | Remover bloqueio (instalação, limpeza, erro, medida) |
| Estrutura | Sintoma/pergunta → resposta prática → quando buscar técnico → link decisão se couber |
| Comercialidade | Baixa |
| Evidência | B/C; segurança em primeiro lugar |
| CTA | Opcional e discreto |
| Links | Para decisão/review relacionados |
| Riscos | Thin FAQ gerado em massa |
| Qualidade | Resolve um problema real de uso no Brasil |

---

# 11. Realidade brasileira

**[CPE]** Não copiar estruturas editoriais americanas/europeias sem adaptação. O padrão editorial do CPE deve considerar:

| Dimensão BR | Regra prática |
|-------------|---------------|
| Preços em reais | Faixas e relatividade; atualizar quando a recomendação depender de preço |
| Custo-benefício | Priorizar valor de uso, não só ticket |
| Parcelamento | Mencionar quando for fator real de decisão (sem virar argumentação de loja) |
| Disponibilidade | Preferir modelos realmente encontrados em marketplaces BR |
| Voltagem | 110/220/bivolt como critério de compra/instalação quando relevante |
| Assistência técnica | Rede de assistência e reputação de pós-venda como critério de confiança |
| Peças/manutenção | Consumíveis, filtros, dificuldade de reposição |
| Dimensões / espaço | Cozinhas e apartamentos brasileiros; corredor, bancada, ventilação |
| Perfil familiar | Solteiro, casal, família, uso intenso de fim de semana etc. |
| Hábitos | Churrasco, feijão/arroz, volume de roupa, clima, falta de energia ocasional quando pertinente |
| Marcas disponíveis | Priorizar marcas com presença real no BR |
| Marketplaces | Comparar caminhos de compra sem fingir ser a loja |
| Importado vs nacional | Quando afetar garantia, peça, voltagem, suporte |
| Linguagem de busca | Usar termos como o brasileiro busca (“custo-benefício”, “vale a pena”, “barato bom”, “melhor fogão 5 bocas”) sem keyword stuffing |

---

# 12. Monetização

## 12.1 Princípio **[CPE]**

A recomendação editorial **não** pode ser determinada simplesmente pela maior comissão.

Ordem de decisão:

1. Adequação ao perfil e critérios  
2. Confiança / assistência / limitações  
3. Custo-benefício  
4. Disponibilidade  
5. Só então: viabilidade de link afiliado (se houver)

Se o melhor produto para o usuário não tiver comissão: **ainda assim pode ser recomendado**, com caminho de compra transparente.

## 12.2 Transparência **[CPE]** (+ alinhamento a práticas de disclosure)

- Divulgar relação de afiliado de forma clara e legível.  
- Não esconder que há remuneração possível.  
- Não apresentar anúncio como análise independente sem disclosure.

## 12.3 Urgência e manipulação **[CPE]**

Proibido:

- estoque falso;  
- countdown artificial;  
- “último dia” sem base;  
- escassez inventada;  
- pressão emocional para clicar.

Permitido:

- informar promoção **verificável** e datada, quando real.

## 12.4 Quantidade e posição de CTAs **[CPE]**

- CTA principal depois que a recomendação foi justificada.  
- CTAs por produto em blocos de decisão — não a cada parágrafo.  
- Evitar parede de botões no hero sem critério.  
- Densidade comercial não pode superar densidade útil.

## 12.5 Preços e atualização **[CPE]**

Preço é um **dado comercial volátil** e não deve ser tratado como informação editorial permanente nas reviews, rankings, comparativos ou guias do Casa Prática Eletro.

### Política vigente

- Tratar preço como volátil.  
- Preferir faixas, posições relativas e “verifique o preço atual”.  
- Atualizar recomendações quando mudança de preço alterar o veredito.  
- Não apresentar print antigo como preço garantido.  
- Não inventar, estimar ou congelar preços atuais como se fossem permanentes.  
- Quando não existir fonte factual, atualizada e confiável de preço **integrada ao projeto**, não inserir preço numérico no corpo do conteúdo apenas para enriquecer a página, satisfazer structured data ou eliminar avisos do Google Search Console.  
- Um alerta de structured data ou Search Console **não** constitui, por si só, autorização para introduzir preço no conteúdo editorial.  
- Ofertas e CTAs devem direcionar o leitor ao **merchant** para consultar o preço/oferta atual — não substituir essa consulta por um valor fixo na página.

### O que a orientação editorial prioriza

1. Identificação do produto  
2. Critérios de escolha  
3. Análise  
4. Comparação  
5. Adequação ao perfil do consumidor  
6. Indicação clara de que o preço/oferta atual deve ser conferido no merchant  

### Por que esta política existe

1. Evitar obsolescência do conteúdo  
2. Reduzir manutenção manual de preços  
3. Evitar divergência entre preço publicado e preço real no merchant  
4. Preservar a validade das reviews ao longo do tempo  
5. Impedir que decisões de structured data sejam tomadas apenas para eliminar warnings do GSC  

### Reavaliação futura (não é proibição absoluta)

Esta regra **não** proíbe preços de forma absoluta.

Preços somente poderão ser utilizados de forma estruturada quando houver:

- fonte factual adequada;  
- atualização confiável;  
- política de manutenção compatível com a volatilidade do dado.

Se futuramente existir uma fonte de preço atualizada e confiável integrada ao projeto, a utilização de preço poderá ser **reavaliada tecnicamente** — sem que um warning do GSC, por si só, force a mudança.

---

# 13. Conversão

## 13.1 Caminho ideal **[CPE]**

```text
BUSCA
→ RESPOSTA
→ CRITÉRIOS
→ COMPARAÇÃO
→ RECOMENDAÇÃO
→ CONFIANÇA
→ CTA
→ CLIQUE
→ COMPRA
```

## 13.2 Princípio de conversão ética

A conversão deve ocorrer porque o usuário conclui:

> “Agora sei qual produto faz mais sentido para mim.”

Não por medo, pressa falsa ou saturação de CTAs.

## 13.3 Elementos que aumentam conversão sem violar people-first **[CPE]**

- Resposta no topo (sem clickbait).  
- Critérios escaneáveis.  
- “Para quem / não é para quem”.  
- Limitações (paradoxalmente aumentam confiança).  
- Alternativa clara.  
- CTA único e óbvio no momento certo.  
- Links internos que removem dúvidas residuais.

---

# 14. Links afiliados

## 14.1 Qualificação de links **[OFICIAL]**

- Links pagos/patrocinados/afiliados devem ser qualificados com `rel="sponsored"` (preferencial) ou `rel="nofollow"`.  
- É aceitável combinar valores `rel`.  
- Ter links afiliados **não** é, por si, violação — desde que haja valor e qualificação adequada.

## 14.2 Regras CPE de implementação **[CPE]**

| Regra | Detalhe |
|-------|---------|
| Todo link afiliado | `rel="sponsored"` (mínimo) |
| Âncora | Descritiva e honesta; sem keyword stuffing |
| Múltiplos sellers | Preferível quando ajudar o usuário **[OFICIAL sugere considerar]** |
| Links internos do site | Normais, crawlable (`<a href>`), sem `sponsored` |
| Links editoriais a fontes | Podem ser follow quando forem citação útil e não pago |
| Não transformar a página | em grade de ofertas |

## 14.3 Onde entram os links afiliados **[CPE]**

1. Após veredito/recomendação justificada.  
2. Em cards/blocos de produto da shortlist.  
3. No fechamento da página.  
**Não** como único conteúdo da dobra inicial.

---

# 15. Dados estruturados

## 15.1 Product **[OFICIAL → CPE]**

**[OFICIAL]**

- Há distinção entre **Product snippets** (páginas em que a pessoa não compra diretamente de você) e **Merchant listings** (compra no próprio site).  
- Para a maioria das páginas afiliadas do CPE, o caminho típico é **product snippet** / review editorial — não merchant listing.  
- Product rich results focam páginas de **um produto** (ou variantes do mesmo produto), não listagens de categoria.  
- Snippets exigem `name` + um de: `review` | `aggregateRating` | `offers`.  
- Pros/cons (`positiveNotes`/`negativeNotes`) são para **editorial product review pages**.

**[CPE]**

| Tipo de página | Schema típico |
|----------------|---------------|
| Review de um modelo | `Product` + `Review` (editorial); pros/cons se presentes na UI |
| Ranking / melhores | Em geral **não** forçar Product em lista multi-produto; preferir conteúdo forte; avaliar caso a caso |
| Guia informativo | Frequentemente nenhum Product |
| Ofertas agregadas | `AggregateOffer` só se dados forem verdadeiros e visíveis |

## 15.2 Review / AggregateRating **[OFICIAL → CPE]**

**[OFICIAL]** Regras críticas:

- Review marcado deve estar **visível** na página.  
- Não agregar reviews/ratings de outros sites.  
- Não incluir reviews falsos ou incentivados sem disclosure claro.  
- Review deve ser sobre item específico, não categoria/lista.  
- Nome de autor válido (Pessoa/Time).  
- Self-serving reviews de Organization/LocalBusiness têm restrições (estrelas).

**[CPE]**

- Só marcar rating se houver metodologia editorial real e rating visível.  
- Não inventar `aggregateRating` a partir de notas de marketplaces.  
- Não usar estrelas só para “parecer rich result”.  
- Se não houver review real elegível → **não marcar**.

## 15.3 Validação **[OFICIAL]**

Usar Rich Results Test / Search Console; structured data não garante exibição.

---

# 16. Arquitetura interna

**[OFICIAL]** Google entende importância relativa via links entre páginas; páginas importantes devem ser alcançáveis por navegação; links crawlable com `href`; anchor text descritivo; toda página que importa deve ter link de pelo menos outra página; promover conteúdos importantes com links contextuais.

**[CPE] Regras de cluster eletrodomésticos**

```text
Hub (Página de Decisão / Melhores)
├── Guia de compra
├── Guias informativos / apoio
├── Comparativos
├── Páginas por atributo / preço
└── Reviews de modelos
```

- Âncoras naturais e específicas (“melhor air fryer para família”, não “clique aqui”).  
- Bidirecionalidade útil: review ↔ hub; informativo → decisão.  
- Não depender só de busca interna do site para descoberta.  
- Evitar orfanizar satélites.

---

# 17. Prevenção de canibalização

**[CPE]** Canibalização = duas ou mais URLs competindo pela mesma intenção dominante sem diferenciação clara.

### Protocolo

1. Mapear keyword/intenção → URL dona.  
2. Se nova query for variante da mesma intenção → atualizar a URL dona.  
3. Se for intenção distinta (atributo, preço, situação) → nova URL só com ângulo exclusivo.  
4. Consolidar páginas fracas/sobrepostas.  
5. Alinhar links internos para reforçar a URL canônica do cluster.  
6. Evitar “melhor X”, “top X”, “X 2026” como três URLs separadas sem diferença real.

### Perguntas anti-canibalização

- Se eu unisse as duas páginas, o usuário perderia algo essencial?  
- A SERP mostra resultados mistos do mesmo tipo?  
- Os títulos poderiam ser trocados sem o leitor notar diferença?

Se “não / sim / sim” → não criar a segunda URL.

---

# 18. Checklist pré-artigo (obrigatório)

O agente deve responder **por escrito** antes de arquitetar:

1. Qual é a intenção principal?  
2. Qual problema do usuário estamos resolvendo?  
3. Qual é a intenção comercial?  
4. Existe página existente que já resolve isso?  
5. Existe risco de canibalização?  
6. Qual será a função dessa URL no cluster?  
7. Qual é a contribuição original da Casa Prática?  
8. Quais critérios serão utilizados?  
9. Quais produtos serão analisados?  
10. Por que cada produto entra?  
11. Para quem cada produto é indicado?  
12. Para quem NÃO é indicado?  
13. Quais limitações precisam ser apresentadas?  
14. Que evidências existem?  
15. Existe experiência direta real?  
16. Se não existe, como comunicamos isso honestamente?  
17. Quais informações precisam ser pesquisadas?  
18. Quais comparações realmente ajudam o usuário?  
19. Qual será a CTA principal?  
20. Onde entram os links afiliados?  
21. Quais links internos devem entrar?  
22. Para quais páginas este artigo deve apontar?  
23. Quais páginas devem apontar para este artigo?  
24. Qual schema é realmente aplicável?  
25. O artigo ainda seria útil sem monetização?

**Se questões essenciais (1–8, 14–16, 25) não tiverem resposta satisfatória: NÃO iniciar a redação.**  
**Após o outline: AGUARDAR APROVAÇÃO.**

---

# 19. Checklist pré-publicação

## 19.1 Qualidade e people-first

- [ ] Responde à intenção dominante na primeira tela útil.  
- [ ] Contribuição original explícita.  
- [ ] Prós **e** contras / limitações.  
- [ ] Para quem serve / não serve.  
- [ ] Sem clickbait / título não exagerado **[OFICIAL]**.  
- [ ] Sem data “fresca” sem mudança substancial.  
- [ ] Who/How/Why claros (autor/método/propósito) quando aplicável.  
- [ ] Passa no Teste da Página Sem Monetização.

## 19.2 Afiliados e compliance

- [ ] Disclosure de afiliado visível.  
- [ ] Links afiliados com `rel="sponsored"`.  
- [ ] Recomendação não ditada por comissão.  
- [ ] Sem urgência artificial.  
- [ ] CTAs na densidade correta.

## 19.3 Realidade BR

- [ ] Modelos disponíveis no Brasil.  
- [ ] Voltagem/espaço/assistência quando relevantes.  
- [ ] Linguagem de busca brasileira natural.  
- [ ] Preço tratado com volatilidade.

## 19.4 Arquitetura e SEO técnico editorial

- [ ] Links internos de entrada/saída definidos.  
- [ ] Sem canibalização com URL existente.  
- [ ] Schema só se elegível e verdadeiro.  
- [ ] Ratings não inventados / não agregados de terceiros.  
- [ ] Âncoras descritivas; links crawlable.

## 19.5 IA (se usada)

- [ ] Houve revisão humana factual e editorial.  
- [ ] Não é página em massa sem valor.  
- [ ] Disclosure de processo se o leitor razoavelmente perguntaria “como foi feito?”.

---

# 20. Métricas pós-publicação

**[CPE]** Tráfego sozinho **não** define sucesso.

## 20.1 Modelo de avaliação

| Camada | Métricas | Pergunta |
|--------|----------|----------|
| Descoberta | Impressões, posição média | A página é encontrada para a intenção certa? |
| Atração | Cliques orgânicos, CTR | O snippet promete o que a página entrega? |
| Engajamento | Usuários, tempo/scroll/páginas seguintes (conforme analytics disponível) | Ajudou ou bounceou por raso? |
| Decisão | Cliques afiliados, CTR afiliado | Houve intenção de compra? |
| Receita | Vendas, receita, conversão (quando rastreável) | Gerou valor sustentável? |

## 20.2 Interpretações **[CPE]**

- **Alto tráfego + zero conversão:** possível mismatch de intenção, thin content, ou CTA/confiança fracos.  
- **Baixo tráfego + alta conversão:** página valiosa; considerar reforço de links internos e cobertura de queries satélite.  
- **Queda após update:** auditar people-first / reviews quality / canibalização — não “encher palavras”.  
- **CTR alto + engajamento baixo:** título/meta desalinhados do conteúdo.

## 20.3 Cadência sugerida **[CPE]**

| Momento | Ação |
|---------|------|
| 7–14 dias | Indexação, impressões iniciais, erros de markup |
| 30 dias | Intenção/CTR/engajamento |
| 60–90 dias | Conversão afiliada e revisão editorial |
| Contínuo | Atualizar quando linha de produto/preço/recomendação mudar de fato |

---

# 21. Tabela-resumo: oficial → implicação CPE

| Orientação oficial | Fonte | Implicação prática CPE |
|--------------------|-------|------------------------|
| People-first, não search-first | Helpful content | Criar páginas para decidir/comprar melhor, não para rankear keywords |
| Experiência de primeira mão e profundidade | Helpful content / Write reviews | Preferir evidência real; senão declarar método analítico |
| Thin affiliation = cópia sem valor | Spam policies | Proibir páginas catálogo; exigir originalidade |
| Bom afiliado adiciona preço, review, teste, comparação, navegação | Spam policies | Checklist anti-thin obrigatório |
| Reviews system recompensa análise original | Reviews system | Rankings e reviews sob padrão alto; português coberto |
| Qualificar links pagos com sponsored/nofollow | Qualify links / Spam | `rel="sponsored"` em afiliados |
| IA ok se útil; spam se escala sem valor | AI guidance / Spam | IA como ferramenta, não fábrica |
| Não datar sem mudança real | Helpful content / Date blog | Atualização substancial ou não atualizar data |
| Product snippet ≠ merchant listing | Product SD | Marcar com cuidado; listagens multi-produto raramente são Product |
| Não agregar ratings de outros sites | Review snippet | Sem estrelas copiadas de marketplace |
| Links internos explicam importância | Ecommerce structure / Links | Clusters com hub e satélites linkados |
| Listas ranqueadas devem se sustentar | Write reviews | Rankings com metodologia e justificativa |

---

# 22. Pontos ambíguos que exigem decisão editorial humana

Estes pontos **não** estão totalmente fechados só pela documentação do Google e precisam de decisão do Casa Prática Eletro:

1. **Nível mínimo de evidência por tipo de página**  
   Ex.: reviews de modelo exigem sempre nível A, ou B honesto basta em categorias novas?

2. **Uso de ratings editoriais numéricos**  
   Escala própria do CPE (ex.: 1–5) vs. evitar estrelas até haver metodologia pública estável.

3. **Quantidade máxima de produtos em rankings**  
   Sugestão operacional: 3–7; definir teto oficial por categoria.

4. **Política de produtos sem comissão na shortlist**  
   Confirmar regra: podem (e devem) aparecer quando forem a melhor escolha.

5. **Disclosure de IA**  
   Quando tornar obrigatório no rodapé vs. só em páginas altamente automatizadas.

6. **Frequência de revisão de preços**  
   Mensal / quinzenal / por alerta de mudança de veredito.

7. **Relação deste guia com `MANUAL_PAGINA_DECISAO.md`**  
   Em conflito de estrutura de UI/fluxo, qual documento prevalece em cada camada (sugerido: identidade em `MANUAL_EDITORIAL`, fluxo comercial em `MANUAL_PAGINA_DECISAO`, conformidade Google/afiliado neste guia).

8. **Páginas “Melhores de 20XX”**  
   Se ano no título é permitido só com revisão anual real, ou evitar ano no slug/título.

---

# 23. Conclusão estratégica

1. O Google não “proíbe afiliados”; ele **penaliza afiliados sem valor** e **recompensa análise útil, original e confiável**.  
2. O diferencial competitivo do CPE não é ter mais URLs — é ter **melhor julgamento editorial brasileiro** por URL.  
3. Monetização sustentável no Search = páginas que ainda ajudam se os links forem removidos.  
4. Futuros agentes devem tratar este arquivo como **gate obrigatório**: pesquisa → intenção → arquitetura existente → riscos → originalidade → proposta → aprovação → produção.  
5. Próxima etapa natural (fora do escopo deste documento): aplicar o checklist pré-artigo a um cluster piloto e só então arquitetar conteúdo novo.

---

## Histórico

| Data | Alteração |
|------|-----------|
| 2026-08-09 | Criação inicial com base em documentação oficial Google Search Central (pesquisa estratégica; sem alterações de páginas/código) |
