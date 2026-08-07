# Regras de Implementação Editorial
## Casa Prática Eletro

**Status:** Documentação permanente — fluxo de produção editorial  
**Caminho canônico:** `docs/EDITORIAL_IMPLEMENTATION_RULES.md`

Este documento define regras operacionais obrigatórias durante a **implementação** de conteúdo editorial (reviews, comparativos e guias de compra).

Não substitui o `MANUAL_EDITORIAL.md` (identidade e tom). Complementa o fluxo de trabalho: como pesquisar, validar e quando interromper o usuário.

Quando uma regra de processo mudar, **atualize este arquivo** (nunca crie “versão 2”).

---

## Verificação Técnica Obrigatória

Durante a implementação de qualquer review, comparativo ou guia de compra, toda informação técnica deverá seguir obrigatoriamente esta ordem de verificação:

1. Biblioteca Técnica do projeto;
2. Página oficial do fabricante;
3. Manual oficial do produto;
4. Ficha técnica oficial;
5. Anúncio oficial utilizado pelo projeto (Mercado Livre e Shopee).

Somente após concluir essas verificações a informação poderá ser utilizada no conteúdo.

---

## Escalonamento de dúvidas

O Agent **não** deverá interromper a implementação para solicitar informações técnicas que possam ser verificadas nas fontes acima.

Somente deverá solicitar intervenção do usuário quando ocorrer uma das situações abaixo:

- conflito entre fontes oficiais;
- ausência completa da informação;
- divergência entre versões do produto;
- decisão editorial que dependa de julgamento humano.

---

## Controle de Atualização da Documentação Estratégica

Durante a implementação de reviews, comparativos, guias ou qualquer outro conteúdo editorial:

Os documentos estratégicos do projeto deverão permanecer estáveis.

Somente poderão ser alterados quando houver uma mudança estrutural efetiva na estratégia editorial.

Consideram-se mudanças estruturais:

- criação de um novo cluster;
- alteração da arquitetura editorial;
- criação ou modificação de convenções permanentes;
- atualização de processos oficiais do projeto.

Não são consideradas mudanças estruturais:

- criação de uma nova review;
- publicação de um comparativo;
- implementação de um guia já previsto no roadmap;
- atualização rotineira de uma Sprint.

### MASTER_ROADMAP_EDITORIAL.md

O `MASTER_ROADMAP_EDITORIAL.md` poderá ser atualizado apenas para registrar a evolução do status do conteúdo implementado.

Exemplo:

```text
⬜ Não iniciado
↓
🟩 Publicado
```

Não alterar prioridades.  
Não reorganizar Sprints.  
Não modificar o planejamento editorial durante implementações.

### seo-rules.md

O documento `seo-rules.md` somente deverá ser atualizado quando houver alteração efetiva da estratégia de SEO do projeto.

A criação de uma nova página prevista no roadmap não deverá provocar reestruturação ou reescrita das regras existentes.

### Objetivo operacional

Durante uma Sprint, o foco do Agent deve ser implementar conteúdo.

Mudanças em documentação estratégica devem ocorrer apenas quando houver uma decisão de arquitetura ou de processo, e nunca como consequência automática da criação de uma nova página.

---

## Registro permanente

Estas regras passam a integrar **permanentemente** o fluxo editorial do Casa Prática Eletro e deverão ser seguidas em **todas** as futuras implementações de reviews, comparativos e guias de compra.
