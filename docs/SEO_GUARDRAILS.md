# SEO Guardrails — Casa Prática Eletro

Este documento **não** é uma sugestão editorial.

É uma **regra operacional** do projeto. Deve ser consultado **antes** de qualquer alteração de SEO, conteúdo, arquitetura, interlink, URL, schema, Title, H1 ou criação/remoção de páginas.

## Objetivo

Impedir alterações especulativas ou corretivas sem evidência suficiente.

A regra central do projeto passa a ser:

**GSC MOSTRA O PROBLEMA → CÓDIGO CONFIRMA A CAUSA → ALTERAÇÃO MÍNIMA → MEDIÇÃO.**

Nunca inverter essa ordem.

---

## 1. Regra de bloqueio

Antes de propor ou executar qualquer alteração, classifique a situação como:

- **PROBLEMA COMPROVADO**
- **HIPÓTESE**
- **OPORTUNIDADE**
- **SEM EVIDÊNCIA SUFICIENTE**

Somente **PROBLEMA COMPROVADO** pode gerar alteração imediata.

**HIPÓTESE** ou **OPORTUNIDADE** não autorizam alteração automática.

**SEM EVIDÊNCIA SUFICIENTE** = **BLOQUEAR**.

Quando estiver bloqueado, não alterar arquivos. Solicitar os dados necessários para validar a hipótese.

---

## 2. GSC é a fonte para decisões de performance

Não concluir canibalização, conflito de intenção ou problema de ranking apenas pela leitura do código.

Quando a questão envolver:

- consultas;
- páginas;
- cliques;
- impressões;
- CTR;
- posição;
- canibalização;
- dispersão de consultas;
- queda ou crescimento de tráfego;

solicitar ou utilizar dados do Google Search Console.

Duas URLs aparecerem para a mesma consulta **NÃO PROVA CANIBALIZAÇÃO**.

É necessário analisar, quando possível:

consulta × página × cliques × impressões × CTR × posição.

Não inventar métricas ausentes.

Se os dados não estiverem disponíveis, declarar:

**EVIDÊNCIA INSUFICIENTE — NÃO ALTERAR.**

---

## 3. Não corrigir posição baixa automaticamente

Uma página estar em posição 40, 50, 60 ou inferior **NÃO** significa, por si só, que exista um problema de Title, H1, conteúdo, schema ou interlink.

Primeiro verificar:

- intenção da página;
- consulta;
- impressões;
- cliques;
- CTR;
- posição;
- arquitetura;
- concorrência interna;
- alterações recentes;
- histórico relevante.

Se a página estiver alinhada à intenção e não houver evidência de problema específico:

**NÃO ALTERAR.**

---

## 4. Preservar a dona arquitetural

Se o projeto já definiu uma URL como dona de determinada intenção, não criar outra página para a mesma intenção apenas porque a página atual está com desempenho baixo.

Antes de propor nova URL, provar:

1. que existe uma intenção distinta;
2. que a intenção não possui dona;
3. que a nova página não criará conflito;
4. que existe demanda ou evidência suficiente;
5. que a arquitetura atual não resolve a necessidade.

Sem essas evidências:

**BLOQUEAR CRIAÇÃO DA NOVA PÁGINA.**

---

## 5. Não alterar Title/H1 sem hipótese testável

Não mudar Title, H1 ou Description apenas porque outra formulação "parece melhor".

Antes da alteração, apresentar:

- situação atual;
- consulta/intenção envolvida;
- evidência GSC, quando aplicável;
- problema específico;
- hipótese;
- alteração mínima proposta;
- métrica que será acompanhada.

Se não houver hipótese verificável:

**NÃO ALTERAR.**

---

## 6. Não alterar interlinks por quantidade

Mais links não significa necessariamente mais autoridade.

Não adicionar links apenas para "reforçar SEO".

Antes de alterar interlinks, identificar:

- origem;
- destino;
- âncora atual;
- função do link;
- intenção do destino;
- existência ou ausência de link contextual;
- possível redundância.

Se já houver links suficientes e coerentes:

**NÃO ADICIONAR OUTRO LINK.**

Links repetidos para o mesmo destino podem ser redundância, não oportunidade.

---

## 7. Não criar conteúdo para preencher espaço

Não adicionar texto, módulos, FAQs ou seções apenas para aumentar o tamanho da página.

Antes de incorporar conteúdo existente, verificar:

- originalidade;
- função;
- intenção;
- redundância;
- valor para a decisão do usuário;
- existência de equivalente em outra página.

Se o conteúdo apenas repetir informação existente:

**NÃO INCORPORAR.**

---

## 8. Diferenciar sobreposição de canibalização

Produtos relacionados podem aparecer em várias páginas sem que exista canibalização.

Exemplo:

- Home = ranking;
- Review curta = para quem serve;
- Análise longa = vale a pena / análise completa.

Mesmo SKU não significa mesma intenção.

Antes de classificar como canibalização, verificar:

- promessa de SERP;
- Title;
- H1;
- estrutura;
- profundidade;
- função da página;
- consultas efetivamente recebidas;
- métricas por página.

Classificação obrigatória:

- **DISTINTA**
- **SOBREPOSIÇÃO LEVE**
- **SOBREPOSIÇÃO RELEVANTE**
- **CONFLITO REAL**

Não usar "canibalização" como conclusão sem evidência suficiente.

---

## 9. Não desfazer decisões arquiteturais sem evidência nova

Alterações já aprovadas e implementadas não devem ser revertidas apenas porque uma alternativa parece teoricamente melhor.

Antes de propor reversão, apresentar:

- decisão anterior;
- motivo original;
- evidência nova;
- problema causado pela decisão;
- alternativa;
- risco da reversão.

Sem evidência nova:

**NÃO REVERTER.**

---

## 10. URLs e redirecionamentos

Não criar URL alternativa para uma intenção que já possui URL dona.

**Keyword diferente não significa intenção diferente.** Volume alto não autoriza URL nova. SSOT: `docs/REGRA_CRIACAO_URLS.md` e `docs/MODELO_CONSTRUCAO_CATALOGO.md`. Sequência: oportunidade → intenção → SERP → patrimônio existente → a página merece existir? → produtos dessa decisão → validar → URL.

Não remover ou alterar 301 sem verificar:

- URL origem;
- URL destino;
- função histórica;
- arquitetura atual;
- links internos;
- indexação;
- evidência GSC.

Mudança de URL é intervenção de alto impacto.

Sempre tratar como **BLOQUEADA** até haver justificativa técnica e evidência.

---

## 11. Schema

Não adicionar, remover ou alterar schema apenas por checklist SEO.

Primeiro verificar:

- qual informação a página realmente apresenta;
- se o schema corresponde ao conteúdo visível;
- se existe necessidade concreta;
- se a alteração pode causar inconsistência.

Schema não deve ser usado como tentativa especulativa de melhorar posição.

---

## 12. Quando o Cursor deve parar

O Cursor deve interromper a execução e **NÃO alterar arquivos** quando:

- os dados necessários não estiverem disponíveis;
- houver apenas hipótese;
- duas páginas aparecerem para a mesma consulta sem evidência de perda;
- a posição estiver baixa, mas a intenção estiver correta;
- houver sugestão de criar nova página sem intenção distinta comprovada;
- houver sugestão de alterar URL dona;
- houver sugestão de mudar Title/H1 sem hipótese;
- houver sugestão de adicionar links sem lacuna comprovada;
- houver sugestão de adicionar conteúdo apenas por volume;
- houver conflito entre arquitetura aprovada e nova proposta;
- uma alteração puder afetar múltiplas páginas do cluster.

Nestes casos, responder:

**BLOQUEADO — EVIDÊNCIA INSUFICIENTE.**

Depois informar exatamente quais dados são necessários para liberar a análise.

---

## 13. Formato obrigatório antes de qualquer alteração

Antes de editar qualquer arquivo relacionado a SEO, apresentar:

```text
STATUS:
PROBLEMA COMPROVADO / HIPÓTESE / OPORTUNIDADE / SEM EVIDÊNCIA

PÁGINA(S):

INTENÇÃO:

EVIDÊNCIA:

PROBLEMA IDENTIFICADO:

HIPÓTESE:

ALTERAÇÃO MÍNIMA:

RISCO:

MÉTRICA A ACOMPANHAR:

ARQUIVOS QUE SERÃO ALTERADOS:
```

Se STATUS não for **PROBLEMA COMPROVADO**:

**NÃO EXECUTAR** automaticamente.

---

## 14. Princípio da menor intervenção

Quando houver problema comprovado:

fazer a menor alteração capaz de testar a hipótese.

Não aproveitar o problema para:

- reorganizar componentes;
- reescrever páginas inteiras;
- criar novas URLs;
- alterar arquitetura;
- modificar vários clusters;
- fazer "melhorias extras".

Uma intervenção = uma hipótese principal.

---

## 15. Regra especial para este projeto

O projeto já passou por ciclos de ajustes arquiteturais, interlinks, diferenciação de páginas e análise de intenção.

Portanto:

**NÃO** presumir que uma estrutura existente está errada apenas porque poderia ser diferente.

Primeiro verificar o que foi definido anteriormente e por quê.

Quando uma auditoria concluir:

**NENHUMA INTERVENÇÃO SUSTENTADA PELOS DADOS**

essa conclusão deve ser respeitada.

Não transformar a auditoria em uma lista especulativa de melhorias.

---

## 16. Exemplo de comportamento correto

**ERRADO:**

> A Home está na posição 60. Vou melhorar o H1, adicionar texto e schema.

**CORRETO:**

> A Home está na posição 60 para determinada consulta. O Title, H1 e conteúdo estão alinhados à intenção. Não há evidência de que o problema seja on-page. Não alterar. Medir autoridade/SERP e aguardar novos dados.

**ERRADO:**

> Home e review aparecem para a mesma consulta. Existe canibalização.

**CORRETO:**

> As duas URLs aparecem para a mesma consulta. Isso demonstra sobreposição de SERP, mas não prova canibalização. É necessário analisar impressões, cliques, CTR, posição, intenção e comportamento das URLs antes de alterar.

**ERRADO:**

> Existe um módulo antigo. Vou colocar na Home para aumentar conteúdo.

**CORRETO:**

> O módulo existe, mas deve ser avaliado quanto a originalidade, intenção e redundância. Se repetir conteúdo já publicado, não incorporar.

---

## 17. Princípio final

O objetivo não é fazer o maior número possível de alterações.

O objetivo é fazer somente alterações sustentadas por evidência.

- **SE NÃO HÁ EVIDÊNCIA:** NÃO ALTERAR.
- **SE HÁ HIPÓTESE:** MEDIR OU VALIDAR.
- **SE HÁ PROBLEMA COMPROVADO:** ALTERAR O MÍNIMO POSSÍVEL.
- **SE A ARQUITETURA ESTÁ FUNCIONANDO:** PRESERVAR.
- **SE HOUVER DÚVIDA COM IMPACTO ARQUITETURAL:** PARAR E SOLICITAR VALIDAÇÃO.
