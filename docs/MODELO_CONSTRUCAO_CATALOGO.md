# Modelo de construção do catálogo

**Status:** decisão permanente de arquitetura operacional e estratégia comercial  
**Data:** 2026-09-26  
**Caminho canônico:** `docs/MODELO_CONSTRUCAO_CATALOGO.md`  
**Regra de agente:** `.cursor/rules/modelo-construcao-catalogo.mdc`

Documentação relacionada: `docs/MASTER_ROADMAP_EDITORIAL.md`, `docs/REGRA_CRIACAO_URLS.md`, `docs/ROADMAP-PLATAFORMA.md` (SSOT técnico de `products.ts`), `.cursor/rules/territorio-catalogo-em-construcao.mdc`, `.cursor/rules/monetizacao-paginas-decisao.mdc`.

Esta decisão **não** autoriza criar páginas, cadastrar SKUs, refatorar o inventário nem alterar afiliados. Define como o catálogo cresce daqui para frente.

## Princípio

Não construímos catálogo para depois procurar o que fazer com ele. Escolhemos uma decisão comercial que merece patrimônio e construímos o catálogo necessário para vencê-la.

---

## 1. Regra do catálogo

O Casa Prática Eletro **não** tem como objetivo cadastrar previamente todo o catálogo possível de eletrodomésticos. O princípio acima é a regra: a decisão vem primeiro; o catálogo existe para sustentá-la.

O catálogo é construído **produto a produto, conforme cada decisão comercial escolhida para virar patrimônio do site**.

Processo:

```text
Oportunidade comercial
  → decisão de página
  → seleção dos produtos
  → consolidação dos produtos daquela página
  → construção da página
  → deploy
  → medição
  → próxima oportunidade
```

Não:

```text
catalogar todos os produtos → depois decidir quais páginas criar
```

`src/data/products.ts` continua sendo a **única fonte técnica** de produtos, identificadores e links afiliados (`docs/ROADMAP-PLATAFORMA.md`). O que muda é o **ritmo de entrada**: um produto só entra quando uma decisão comercial concreta precisa dele.

---

## 2. Objetivo do projeto

O objetivo é construir **patrimônio digital capaz de gerar vendas por afiliado**.

Não é maximizar:

- número de SKUs cadastrados;
- número de páginas;
- número de artigos;
- volume bruto de sessões;
- quantidade de palavras-chave.

Prioridade:

**eficácia comercial > volume bruto de tráfego**

Tráfego continua importante. Não é o KPI final isolado.

Uma oportunidade com menor volume de busca pode ser prioritária quando apresentar:

- intenção de compra mais clara;
- SERP comercial compatível;
- boa adequação dos produtos;
- catálogo suficiente **para aquela decisão**;
- boa monetização;
- potencial de conversão.

Keyword diferente continua sem justificar URL nova (`docs/REGRA_CRIACAO_URLS.md`). Volume alto, sozinho, também não.

---

## 3. O que significa “catálogo consolidado”

**Não significa:**

> todos os produtos do site estão cadastrados, centralizados e completos.

**Significa:**

> o conjunto de produtos necessário para uma determinada decisão comercial está suficientemente validado, identificado, monetizado e pronto para sustentar a página.

Uma página pode ter o próprio catálogo consolidado sem que o universo de produtos do Casa Prática esteja previamente catalogado.

---

## 4. Catálogo por decisão

Cada página comercial tem o próprio conjunto de produtos: somente os necessários para aquela decisão.

### Exemplo já construído

Página: `/melhores/melhor-fogao-5-bocas/`

Catálogo da decisão:

- Electrolux FE5IG
- Brastemp BFS5NCR
- Consul CFS5NAR

Esses produtos foram consolidados porque sustentam essa decisão. Não porque o site precisava de um catálogo geral de fogões.

### Exemplo futuro

Página: `/melhores/melhor-fogao-4-bocas-de-embutir/`

O catálogo necessário será somente o conjunto efetivamente selecionado para essa decisão. Não é necessário cadastrar previamente todos os fogões de embutir do mercado.

Enquanto esse conjunto não estiver validado e monetizado, o território permanece **promissor — catálogo em construção** (`.cursor/rules/territorio-catalogo-em-construcao.mdc`): pipeline, sem URL prematura.

---

## 5. Critério para incluir um produto

Um produto entra no catálogo operacional quando houver uma **razão concreta** para existir dentro de uma decisão comercial.

Validar, conforme aplicável:

- identidade do produto;
- marca;
- modelo;
- productId;
- categoria;
- especificações necessárias;
- imagem;
- dados factuais;
- links de afiliado;
- marketplace;
- relação com a página comercial;
- coerência entre produto, CTA e destino.

Não cadastrar produtos apenas:

- porque podem ser úteis algum dia;
- para aumentar o número de SKUs;
- para completar artificialmente uma categoria;
- porque possuem volume de busca;
- para criar um catálogo genérico.

Pesquisa externa de mercado **não** é cadastro no inventário. Oferta de afiliado precisa estar confirmada no painel antes do CTA (`.cursor/rules/monetizacao-paginas-decisao.mdc`).

---

## 6. Ordem correta de trabalho

Para qualquer nova oportunidade comercial:

| Etapa | O que fazer |
|-------|-------------|
| **1. Identificar a oportunidade** | Demanda, intenção, SERP, concorrência, potencial comercial, adequação ao projeto |
| **2. Decidir se a página merece existir** | Somente depois da análise comercial. Se a URL existente já resolve a decisão, fortalecer essa URL |
| **3. Construir o catálogo daquela decisão** | Selecionar os produtos necessários — não o universo da categoria |
| **4. Validar os produtos** | Identidade, fatos, imagens, afiliados, consistência |
| **5. Construir a página** | Somente depois das etapas 1–4 |
| **6. Deploy** | Publicar |
| **7. Medir** | Impressões, cliques orgânicos, CTR, consultas, posições, cliques em afiliados, comportamento comercial |
| **8. Próxima oportunidade** | Usar os dados acumulados para decidir o próximo investimento |

A etapa 2 continua sujeita a `docs/REGRA_CRIACAO_URLS.md`: intenção e decisão diferentes, não só keyword diferente.

---

## 7. Consolidação incremental

Não exigir que todos os SKUs atuais, todas as categorias, todos os reviews ou todas as especificações estejam perfeitamente centralizados antes de criar uma nova página comercial.

A consolidação é **incremental e orientada por oportunidade**.

Se uma inconsistência não afeta a próxima decisão comercial, registrá-la como dívida técnica (`docs/TECH-DEBT.md`) e priorizá-la depois. Não bloquear o crescimento por uma consolidação global do inventário.

---

## 8. Os 18 productIds atuais

O inventário possui 18 productIds. Isso **não** significa transformá-los imediatamente em catálogo editorial completo, nem criar uma página para cada um.

Classificar por função:

| Função | O que fazer |
|--------|-------------|
| Já utilizados em páginas comerciais | Manter; evoluir só quando a decisão da página pedir |
| Utilizados em hubs | Idem — o hub é a decisão; o SKU é componente |
| Candidatos a futuras decisões | Permanecem no inventário até uma decisão concreta selecioná-los |
| Ainda não necessários para nenhuma decisão em curso | Não viram página nem trabalho de “completar ficha” por iniciativa própria |

Não transformar automaticamente todos em páginas.

---

## 9. Unidade de patrimônio

A unidade de crescimento do projeto é a **decisão comercial**.

O SKU é um componente da decisão. A página é o patrimônio.

```text
Melhor fogão 5 bocas
  → decisão comercial
  → 3 produtos
  → comparação
  → página que sustenta a compra
```

Crescer o número de productIds sem uma decisão que eles sustentem não aumenta o patrimônio.

---

## O que esta decisão não altera

- `products.ts` segue como SSOT técnico de afiliados.
- Trailing slash, anti-canibalização e “1 intenção = 1 URL dona” permanecem.
- Território com demanda validada e produtos ainda insuficientes **para aquela decisão** continua em pipeline, sem página prematura.
- Página comercial continua exigindo oferta afiliada confirmada antes do CTA.
- Motor III (patrimônio visual), CRO em observação e a arquitetura estável do site não são reabertos por este documento.
