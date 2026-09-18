# Histórico de experimentos de CRO

Memória institucional dos testes de conversão do Casa Prática Eletro.

## Regra permanente

**Nunca executar duas mudanças relevantes de CRO ao mesmo tempo.**

Ciclo obrigatório de todo experimento:

1. Hipótese  
2. Implementação  
3. Deploy  
4. Janela de observação  
5. Veredito  
6. Registrar aprendizado (este log)  
7. Só então iniciar o próximo experimento  

Parece lento; em afiliados, costuma ser mais consistente do que várias mudanças simultâneas.

**Regra de agente:** `.cursor/rules/cro-um-experimento-por-vez.mdc`

**Regra operacional:** um experimento ativo por vez no funil comercial medido. Registrar o veredito **antes** de abrir o próximo ID. Não reinterpretar critérios depois de ver os números — ver o protocolo de cada experimento.

**Culturas em paralelo (não misturar na mesma janela):**

| Arquitetura / SEO / Patrimônio | Growth / CRO |
|--------------------------------|--------------|
| Base sólida, conteúdo, clusters | Hipótese → experimento → medição → decisão |
| Pode seguir em frentes não comerciais | Congela o funil sob teste durante a janela |

---

## Log

| ID | Hipótese | Alteração | Resultado | Decisão |
|----|----------|-----------|-----------|---------|
| **CRO-001** | Aproximar o CTA do momento da decisão aumenta os cliques afiliados | CTA afiliado único no Hero dos hubs Melhores (5 bocas, 4 bocas, mesa de vidro), SSOT via `featuredHeroProduct` | **Parcialmente encerrado no 5 bocas** (17/ago/2026): a URL `/melhores/melhor-fogao-5-bocas/` não era a dona da intenção — ranking fica na home. Janela segue só em 4 bocas e mesa de vidro. | Aguardando janela nas 2 URLs restantes |
| **CRO-002** | Oferta direta na tabela comparativa da Home aumenta a captura de intenção de compra sem reduzir de forma relevante os cliques dos cards | Coluna “Onde comprar” na tabela da Home (5 CTAs SSOT); microcopy do CTA do hero e rótulo do bloco comercial | **Em observação** (17/set/2026) | Aguardando janela na Home (`/`). Sem veredito. |

---

## CRO-001 — detalhe

| Campo | Valor |
|-------|--------|
| Protocolo | [`docs/EXPERIMENTO_HERO_CTA_MELHORES.md`](./EXPERIMENTO_HERO_CTA_MELHORES.md) |
| Hipótese | Reduzir a distância entre a decisão (ranking 🥇) e a 1ª consulta de preço aumenta cliques / CTR afiliado |
| Escopo | Original: 3 hubs. **Desde 17/ago/2026:** `/melhores/melhor-fogao-4-bocas/`, `/melhores/melhor-fogao-mesa-de-vidro/` (`/melhores/melhor-fogao-5-bocas/` saiu do teste — 301 para a home) |
| KPI principal | **CTR Afiliado** = cliques afiliados ÷ sessões Melhores |
| Janela | 7 dias corridos **ou** ≥ 300 sessões (o que vier depois) |
| Sucesso | CTR Afiliado e/ou cliques afiliados sobem de forma significativa **sem** depender só de mais tráfego |
| Neutro | Variação fraca / ambígua |
| Fracasso | CTR e cliques ≈ iguais ou piores → hipótese de timing não confirmada |
| Não contaminação | Nenhum deploy de funil comercial nas páginas sob teste durante a janela |
| Data deploy | _preencher_ |
| Veredito final | _preencher após a janela_ |
| Próximo passo | Se sucesso → Sprint B (Hero outras money pages → Home → Reviews → Cards). Se não → nova hipótese (confiança / SKU / microcopy). Plano de conversão Melhores (bloqueado): [`docs/PLANO_POS_CRO_001_CONVERSAO_MELHORES.md`](./PLANO_POS_CRO_001_CONVERSAO_MELHORES.md) |

---

## CRO-002 — detalhe

| Campo | Valor |
|-------|--------|
| Nome | Sprint A — Home \| Máquina de Vendas Turbo 2.0 |
| Data de registro | 17/set/2026 |
| Página | `/` (Home). A Home permanece dona de “melhor fogão 5 bocas”. |
| Hipótese | Quando o usuário compara os três modelos na tabela da Home, oferecer um caminho direto para a oferta correspondente naquele mesmo ponto da decisão pode aumentar os cliques afiliados sem reduzir de forma relevante os cliques nos cards de produtos. |
| Objetivo | Aumentar a captura de intenção de compra na Home, tornando a oferta acessível diretamente no momento em que o usuário compara os três fogões. |
| Escopo | Somente `/`. **Não** inclui CRO-001 nem `/melhores/melhor-fogao-4-bocas/` nem `/melhores/melhor-fogao-mesa-de-vidro/`. |
| Alteração | (1) Hero: CTA “VER MELHOR PREÇO AGORA” → “Ver os modelos e ofertas”; continua âncora `#top-produtos`; **não** é link afiliado e **não** dispara `affiliate_click`. (2) Bloco comercial: rótulo “Escolha rápida” → “Modelos e ofertas”. (3) Tabela: coluna “Onde comprar” com CTA por linha, SSOT, mesmo `product_id` da linha. |
| SKUs / merchants | Electrolux FE5IG — Mercado Livre (sem Shopee). Brastemp BFS5NCR — Mercado Livre + Shopee. Consul CFS5NAB — Mercado Livre + Shopee. |
| Novos CTAs afiliados | **5** na tabela. Os 5 CTAs dos cards (`cta_position = product_card`) foram preservados. |
| Tracking | Evento existente `affiliate_click`. Tabela: `cta_position = comparison_table`, `page_type = home`, mais `product_id`, `merchant`, `cta_type`. Sem evento novo. |
| KPI principal | `affiliate_click` com `page_type = home` e `cta_position = comparison_table` |
| KPI secundário | `affiliate_click` com `page_type = home` e `cta_position = product_card` |
| Métricas posteriores (quando disponíveis) | Sessões/usuários da Home; cliques afiliados; cliques por SKU, merchant e posição; clique/conversão nos painéis ML/Shopee; comissão gerada. **Não registrar venda como resultado deste experimento até haver dado.** |
| Sucesso / neutro / fracasso | **Não declarar agora.** Análise futura: Home `comparison_table` × `product_card`; quando possível, `affiliate_click` × painéis Mercado Livre/Shopee. |
| Pergunta do experimento | Dar acesso à oferta diretamente na tabela comparativa aumenta a captura de intenção de compra na Home? |
| Não contaminação | Não alterar CRO-001, as 2 URLs Melhores restantes, `products.ts`, SmartRecommendations, Header/Footer, URLs, canonical, schema, metadados nem links afiliados existentes. |
| Data deploy | _preencher após ir a produção_ |
| Veredito | **Em observação** — sem vencedor nem perdedor |

---

## Como usar este log

1. Antes de um novo teste: ler IDs anteriores — **não** repetir hipóteses já refutadas sem motivo novo.
2. Abrir `CRO-00N` só com protocolo (hipótese, KPIs, critérios, janela) **antes** do deploy.
3. Preencher Resultado e Decisão na mesma linha da tabela ao fechar o experimento.
4. Procurar padrões ao longo do tempo (ex.: timing vs. cor de botão vs. microcopy).

---

## Sprint B (só se CRO-001 = Sucesso) — anotada, não executar

1. Hero das demais money pages  
2. Home (se alimentar os hubs)  
3. Reviews  
4. Cards  
