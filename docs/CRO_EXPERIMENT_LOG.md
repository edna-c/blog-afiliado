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
| CRO-002 | — | — | — | — |

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
