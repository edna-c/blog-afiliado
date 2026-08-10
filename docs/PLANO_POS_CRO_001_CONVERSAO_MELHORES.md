# Plano pós–CRO-001 — conversão Melhores (não implementar agora)

**Status:** preparado · **bloqueado** até encerramento / veredito do CRO-001  
**Escopo principal:** `/melhores/melhor-fogao-5-bocas/` (padrão aplicável aos demais hubs Melhores só com decisão explícita)  
**Relacionados:** `docs/CRO_EXPERIMENT_LOG.md` · `docs/EXPERIMENTO_HERO_CTA_MELHORES.md` · `docs/MANUAL_PAGINA_DECISAO.md` · `docs/GUIA_EDITORIAL_AFILIADOS_ELETRODOMESTICOS_GOOGLE.md`

> Este arquivo **não autoriza** implementação. É o backlog de avaliação após o CRO-001.

---

## Gate

Só abrir este plano quando:

1. A janela do CRO-001 estiver cumprida (7 dias **ou** ≥ 300 sessões Melhores — o que vier depois), **ou**
2. Houver decisão editorial explícita de encerrar o experimento,

**e** o veredito estiver registrado em `docs/CRO_EXPERIMENT_LOG.md`.

Até lá: **não** alterar Hero afiliado, posição/quantidade do primeiro CTA experimental, nem hierarquia comercial do topo.

---

## A. CTA pós-justificativa

Avaliar se o momento ouro do funil editorial está sendo usado:

```text
recomendação → critérios → justificativa → vantagens → limitações → perfil indicado → CTA
```

Hoje as justificativas em `_melhor-fogao-5-bocas-justificativas.md` já têm CTA afiliado ao fim de cada medalha. Pós–CRO-001, avaliar:

- se esse CTA deve ser o **principal** caminho comercial (vs. Hero / cards);
- se a densidade cards + tabela + justificativas gera saturação;
- se o SSOT de URLs deve sair do HTML hardcoded no markdown para `products.ts` / bloco comercial (manutenção, sem mudar arquitetura de rotas).

---

## B. Estratégia de CTA (copy)

Avaliar se **«VER PREÇO NO MERCADO LIVRE»** permanece o CTA principal adequado.

Regras permanentes (já aplicadas nas correções objetivas pré–veredito):

- sem «melhor preço» sem comprovação;
- sem sugerir que a compra ocorre no Casa Prática Eletro;
- sem urgência / pressão artificial;
- texto = ação real após o clique.

Após o veredito do Hero, decidir se o CTA do Hero (se mantido) e o dos cards devem continuar com o **mesmo** rótulo factual.

---

## C. Mobile

Reavaliar com evidência (Analytics / comportamento):

- posição e distância vertical até o primeiro CTA;
- tamanho e clareza dos botões;
- visibilidade vs. rolagem;
- repetição de saídas afiliadas;
- peso visual dos cards (`aspect-square`);
- usabilidade da tabela (`min-w` / scroll horizontal);
- caminho até a decisão (ranking → perfil → preço).

Não misturar vários layout shifts no mesmo deploy se a meta for atribuir impacto (preferir um experimento CRO-00N por hipótese).

---

## D. Quantidade de CTAs

Objetivo: CTAs nos pontos de **maior intenção de decisão** — não maximizar nem minimizar por padrão.

Mapear saídas afiliadas (Hero, cards, tabela, justificativas, footer) e perguntar:

- qual saída o usuário qualificado realmente precisa em cada etapa?
- há redundância tabela ≈ cards sem valor novo?

---

## E. Fluxo comercial alvo

```text
ENTRADA
↓
ENTENDIMENTO
↓
RECOMENDAÇÃO
↓
JUSTIFICATIVA
↓
CONFIANÇA
↓
PRODUTO
↓
CTA
↓
MERCADO LIVRE
```

Cruzar com o veredito CRO-001:

| Veredito CRO-001 | Direção sugerida (avaliar, não executar às cegas) |
|------------------|-----------------------------------------------------|
| **Sucesso** | Manter Hero afiliado; **não** empilhar mais CTAs no topo; reforçar pós-justificativa e mobile |
| **Neutro / Fracasso** | Avaliar Hero → âncora `#guia-comercial-produtos` (sem afiliado no topo); priorizar confiança → CTA |

---

## Ordem sugerida pós-veredito

1. Registrar veredito no log CRO.  
2. Ramificação do Hero (manter vs. âncora interna) — **um** deploy controlado.  
3. Uma hipótese de conversão por vez (ex.: mobile cards **ou** CTA footer do top pick **ou** densidade tabela).  
4. Refinos de SSOT / TLDR / disclosure — só depois.

---

## Fora de escopo deste plano

- Novas páginas / rankings / cluster só por keyword  
- Mudança de canonical, sitemap ou arquitetura global  
- Alterar recomendação editorial por comissão  
- Build/commit/deploy sem autorização humana  
