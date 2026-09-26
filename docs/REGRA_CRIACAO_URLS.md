# Regra de criação de URLs: keyword diferente não significa página diferente

**Status:** documentação permanente (regra de decisão arquitetural)  
**Caminho canônico:** `docs/REGRA_CRIACAO_URLS.md`  
**Regra de agente:** `.cursor/rules/criacao-urls-por-intencao.mdc`  
**Prompt:** `docs/BIBLIOTECA_DE_PROMPTS.md` §13

Documentação relacionada: `docs/seo-rules.md` (mapa-base de intenções), `docs/MANUAL_SEO.md`, `docs/SEO_GUARDRAILS.md`, `docs/MASTER_ROADMAP_EDITORIAL.md`, `docs/MODELO_CONSTRUCAO_CATALOGO.md` (catálogo da decisão, não catálogo universal).

---

## Regra de criação de URLs por intenção

Antes de criar uma nova URL a partir de uma keyword encontrada em ferramentas como Semrush, Google Search Console ou outras fontes de demanda, verificar primeiro se o site já possui uma página que resolve a mesma intenção de busca.

### Regra principal

**Keyword diferente não significa intenção diferente.**

Uma nova keyword, mesmo com volume alto, NÃO justifica automaticamente uma nova URL.

Antes de criar uma página, verificar:

1. A intenção de busca é realmente diferente?
2. A decisão de compra que o usuário precisa tomar é diferente?
3. A página existente já possui os produtos necessários para resolver essa busca?
4. O conteúdo necessário para responder à busca já pode ser incorporado à página existente?
5. Uma nova URL teria produtos, critérios, comparação e conclusão diferentes?
6. Existe um território comercial/editorial realmente novo?

Se a resposta indicar que a página existente já resolve a intenção, **fortalecer a página existente em vez de criar uma nova URL.**

### Exemplo concreto do projeto

Existe a demanda:

**fogão 4 bocas mesa de vidro**

Isso não significa automaticamente criar:

`/melhores/melhor-fogao-4-bocas-mesa-de-vidro/`

se já existe:

`/melhores/melhor-fogao-mesa-de-vidro/`

e essa página:

* possui modelos de 4 bocas;
* possui links afiliados para esses modelos;
* compara os produtos;
* explica os critérios de escolha;
* resolve a decisão de compra;
* pode ser fortalecida para a intenção específica.

Nesse cenário, a estratégia correta é:

**manter uma única URL e ampliar a cobertura semântica e comercial da página existente.**

URL dona no mapa-base: `fogão 4 bocas mesa de vidro` → `/melhores/melhor-fogao-mesa-de-vidro/` (não criar URL combinada).

### Quando NÃO criar nova URL

Não criar uma nova página quando ela teria:

* os mesmos produtos;
* os mesmos SKUs;
* os mesmos links comerciais;
* os mesmos critérios de escolha;
* a mesma comparação;
* a mesma decisão de compra;
* conteúdo essencialmente igual;
* apenas uma keyword diferente no título.

Isso não representa expansão real de patrimônio.

Representa risco de:

* canibalização;
* diluição de autoridade;
* duplicação editorial;
* confusão sobre qual URL deve responder à consulta;
* manutenção desnecessária;
* fragmentação de sinais internos e externos.

### Quando uma nova URL pode ser justificável

Uma nova URL pode ser criada quando houver evidência de uma **intenção ou decisão realmente diferente**.

Exemplos conceituais:

* comprar por custo-benefício;
* comparar 4 vs. 5 bocas;
* escolher entre mesa de vidro e inox;
* avaliar uma marca/modelo específico;
* escolher um tipo de instalação;
* escolher uma categoria de produto diferente.

Mesmo nesses casos, verificar primeiro se uma página existente já atende à intenção.

### Regra operacional

Sempre seguir esta sequência:

**Oportunidade → intenção → SERP → patrimônio existente → a página merece existir? → produtos dessa decisão → validar → URL**

Alinhado a `docs/MODELO_CONSTRUCAO_CATALOGO.md`. Os produtos entram **depois** da decisão de página, e somente os necessários para ela. Não cadastrar o universo da categoria antes.

Nunca:

**Keyword → volume alto → nova URL**

### Princípio de patrimônio

O objetivo do projeto é aumentar o patrimônio digital, não aumentar artificialmente a quantidade de URLs.

**Uma página existente que passa a atender uma nova demanda relevante também é crescimento de patrimônio.**

Portanto:

> **Antes de criar uma nova URL, prove que existe uma decisão diferente a ser resolvida — não apenas uma keyword diferente.**

### Teste final

Antes de criar qualquer nova página, faça esta pergunta:

> **“Se eu colocar os mesmos produtos e a mesma decisão da página existente nesta nova URL, o usuário teria algum motivo real para preferir uma página em vez da outra?”**

Se a resposta for não:

**não criar a URL. Fortalecer a página existente.**

---

## Futuras execuções

Esta documentação é regra de decisão arquitetural.

Quando uma nova oportunidade de keyword for encontrada, primeiro verificar o patrimônio existente e a intenção da SERP.

Não sugerir criação de URL apenas por volume de busca.

Não usar “keyword diferente” como justificativa suficiente para uma nova URL.
