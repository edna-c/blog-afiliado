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

O status **Publicado** somente poderá ser registrado após as validações de build descritas neste documento.

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

## Build — conclusão obrigatória

A implementação somente poderá ser considerada concluída após:

- build executado;
- build sem erros;
- geração da página;
- validação final.

O status **Publicado** somente poderá ser registrado após essas validações.

---

## Recuperação de build

Caso o build falhe por:

- cache;
- Vite;
- lockfile;
- processo concorrente;
- EPERM;

o Agent deverá realizar **apenas uma** tentativa automática de recuperação.

Se a recuperação falhar novamente:

1. interromper a execução;
2. explicar objetivamente o motivo;
3. aguardar orientação do usuário.

Não encadear novas tentativas automáticas além dessa única recuperação.

---

## Ambiente — conflito com desenvolvimento ativo

Antes do build final, verificar se existe ambiente de desenvolvimento ativo.

Exemplos:

- `bun run dev`
- `astro dev`
- `vite`

Caso exista:

- informar ao usuário que poderá ocorrer conflito de cache;
- **não** executar múltiplos builds concorrentes.

---

## Implementação × Review

Nunca entrar em modo Review antes da validação final.

Review somente após:

- build aprovado;
- checklist aprovado;
- implementação concluída.

---

## Registro permanente

Estas regras passam a integrar **permanentemente** o fluxo editorial do Casa Prática Eletro e deverão ser seguidas em **todas** as futuras implementações de reviews, comparativos e guias de compra.
