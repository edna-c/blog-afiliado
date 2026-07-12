# CHANGELOG – Documentação Casa Prática Eletro

Registro de mudanças nos manuais e padrões oficiais em `docs/`.  
Atualize este arquivo sempre que um manual canônico for alterado de forma relevante.

Formato: mais recente no topo.

---

## 2026-07-11

### Manual de Direção Visual

- Criado `MANUAL_DIRECAO_VISUAL.md` — princípios de composição, ritmo e aproveitamento visual.
- Modelo oficial de experiência: Melhor Fogão 5 Bocas.
- Complementa (não substitui) o `MANUAL_DESIGN_SYSTEM.md`: direção = composição; Design System = tokens/implementação.
- Referências cruzadas em Design System, Página de Decisão e Manual Design.

### SSOT editorial — Página de Decisão

- `MANUAL_PAGINA_DECISAO.md` é o **único** manual editorial de páginas comerciais (artigo afiliado + página de decisão fundidos).
- **Modelo oficial:** configuração geral do Fogão 5 bocas (home + hub + satélites + reviews + `products.ts`).
- Removido `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md` (não há mais ponte nem segundo arquivo).
- Conteúdo útil do antigo framework incorporado ao canônico.
- Ranking só no Hero — não repetir no corpo.
- Referências cruzadas apontam apenas para `MANUAL_PAGINA_DECISAO.md`.

### Revisão final de direção de arte — guia comercial congelado

- Microajustes de respiro: stack 4.5rem, fechamento 6rem, FAQ e justificativas com ar entre unidades.
- Checklists de decisão: leve respiro entre itens de lista.
- Tokens §3.5 do `MANUAL_DESIGN_SYSTEM.md` atualizados (referência oficial).

### Acabamento editorial — respiro premium (direção de arte)

- Escala de ritmo do guia comercial ampliada: stack 4.25rem, fechamento 5.5rem, H2→intro 1.15rem.
- Justificativas: mais ar entre medalhas (hr), sob imagens e nos H3.
- FAQ: mais respiro título→lista, pergunta→resposta e entre itens.
- Relacionados: pausa maior antes do encerramento + leve respiro interno.

### Acabamento — ritmo vertical do guia comercial (modelo oficial)

- Página Melhor Fogão 4 Bocas: tokens `--editorial-stack` / `--editorial-stack-close` e hierarquia H2 uniforme (escopo `.guide-editorial`).
- FAQ: respiro sutil entre pergunta/resposta e entre itens; `dt` com peso 700.
- Relacionados: respiro maior antes do encerramento editorial.
- `MANUAL_DESIGN_SYSTEM.md` §3.5 atualizado com a escala de ritmo.

### Design System — Layout Editorial Amplo (SSOT)

- Criado `MANUAL_DESIGN_SYSTEM.md` como **Single Source of Truth** da identidade visual e arquitetura de layout do portal.
- Princípios oficiais: Layout Editorial Amplo, Container Único, Largura por Contexto, Módulos, Ritmo vertical, Escaneabilidade, Experiência editorial, Design System flexível.
- Regra permanente: consultar este manual antes de qualquer mudança estrutural de layout/componentes/grids/tipografia.
- `MANUAL_DESIGN.md` passou a ser ponte legada apontando para o SSOT (sem documento duplicado de regras).

### Framework editorial afiliado (padrão definitivo)

- Reescrito `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md` como framework de **página de decisão** (não artigo longo).
- Ordem oficial: Hero (box ranking) → Intro → Cards → Tabela → Justificativas ×3 → Como avaliamos → Perfil → Antes de comprar → Aprofundar → FAQ → Relacionados.
- Artigo-padrão alinhado: Melhor Fogão 4 Bocas (justificativas de medalha + seções com info nova).
- Regra central: cada seção só permanece se acrescentar informação nova à decisão de compra.

---

## 2026-07-10

### Documentação oficial

- Criada a estrutura permanente em `docs/`:
  - `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md` (referência oficial de artigos afiliados; baseado no Melhor Fogão 4 Bocas reestruturado)
  - `MANUAL_SEO.md` (estrutura; detalhe ainda em `seo-rules.md`)
  - `MANUAL_DESIGN.md` (estrutura)
  - `PADROES_DE_COMPONENTES.md` (estrutura)
  - `BIBLIOTECA_DE_PROMPTS.md` (estrutura + prompts iniciais)
  - `CHANGELOG.md` (este arquivo)
- Removido o caminho legado `manual-editorial-guias-afiliados.md` em favor do canônico `MANUAL_EDITORIAL_ARTIGOS_AFILIADOS.md`.

### Regra de manutenção

- Novos padrões → incorporar no manual canônico correspondente.
- Não criar “versão 2” de manuais; atualizar o arquivo oficial e registrar aqui.
