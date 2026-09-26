# MANUAL DE INTERAÇÃO COM AGENTES
## Casa Prática Eletro

**Status:** Documentação permanente (fluxo oficial)  
**Caminho canônico:** `docs/MANUAL_INTERACAO_AGENTES.md`

Este documento define o fluxo oficial de trabalho entre os agentes de IA e a direção do projeto.

Quando uma regra mudar, **atualize este arquivo** (nunca crie “versão 2”).

---

# Objetivo

Garantir previsibilidade, segurança, rastreabilidade e controle antes de qualquer alteração relevante.

---

# Fluxo Oficial

## 1. Diagnóstico

O agente identifica uma oportunidade, inconsistência ou problema.

Nesta etapa **não deve alterar nenhum arquivo**.

Deve apenas explicar claramente o que encontrou.

---

## 2. Proposta

O agente apresenta a solução sugerida.

Sempre explicando o motivo da alteração.

---

## 3. Impacto

O agente informa exatamente:

- quais arquivos serão alterados;
- quais componentes serão afetados;
- possíveis impactos visuais, editoriais, técnicos ou de SEO.

---

## 4. Autorização

Nenhuma alteração estrutural, editorial ou comercial deverá ser executada sem autorização explícita.

Respostas genéricas como “sim” deverão ser interpretadas apenas dentro do contexto da proposta apresentada.

Quando houver dúvida sobre o escopo da autorização, o agente deverá perguntar novamente antes de executar.

---

## 5. Execução

Somente após autorização.

A alteração deverá respeitar o escopo aprovado.

Caso durante a execução surjam mudanças adicionais, o agente deverá interromper a execução e solicitar nova autorização.

---

## 6. Validação

Após concluir, o agente deverá validar:

- build;
- lint;
- funcionamento;
- consistência visual;
- SEO (quando aplicável);
- impactos na experiência do usuário.

---

## 7. Relatório Final

Ao finalizar deverá informar:

- o que foi alterado;
- quais arquivos foram modificados;
- validações executadas;
- pendências existentes;
- próximos passos sugeridos (opcional).

Em **artigo novo, revisado, atualizado, guia, comparativo, ranking, review ou conteúdo de apoio**, o relatório **não está completo** sem:

- a **PASSAGEM 2 de voz** (Camada de Naturalidade — `docs/BIBLIOTECA_DE_PROMPTS.md` §12 e `.cursor/rules/camada-naturalidade.mdc`): o texto visível passou pela leitura em voz alta e não restou linguagem artificial, corporativa ou de funil/SEO;
- a seção **ANÁLISE DE IMAGENS** (`docs/BIBLIOTECA_DE_PROMPTS.md` §11 e `.cursor/rules/analise-imagens-artigos.mdc`).

Essa análise de imagens **não autoriza** gerar, procurar ou inserir imagens. Só apresenta oportunidades (ou declara que não há ponto natural). Produção ou inserção só após aprovação explícita. Novo arquivo no repositório continua exigindo aprovação humana (`MANUAL_DESIGN_SYSTEM.md` §6).

---

# Princípio Geral

Quando o **Prompt Mestre — Modo Execução** estiver ativo (`docs/BIBLIOTECA_DE_PROMPTS.md` §8 e `.cursor/rules/modo-execucao-crescimento.mdc`):

- executar e continuar sem nova autorização nos casos previstos nesse prompt;
- pedir aprovação só para risco arquitetural, novos módulos, mudanças irreversíveis ou decisão estratégica;
- escolher a próxima tarefa pela ordem de prioridade do Prompt Mestre.

Quando o **Motor III — Patrimônio Visual** estiver ativo (`docs/BIBLIOTECA_DE_PROMPTS.md` §9 e `.cursor/rules/modo-execucao-patrimonio-visual.mdc`):

- priorizar biblioteca visual (reuso → gaps ALTA → organização);
- **novo arquivo de imagem no repositório** exige aprovação humana (`MANUAL_DESIGN_SYSTEM.md` §6);
- ao concluir, atualizar `src/data/visualAssetRegistry.ts` e seguir o próximo gap.

A **ANÁLISE DE IMAGENS** de artigos (`docs/BIBLIOTECA_DE_PROMPTS.md` §11) é gate editorial separado: avalia pontos de inserção no texto e pede aprovação **antes** de produzir ou ligar ativo. Não substitui o fluxo Motor III (SSOT → backlog) nem autoriza arquivo novo no repo.

A **Camada de Naturalidade** (`docs/BIBLIOTECA_DE_PROMPTS.md` §12) é gate de voz: a passagem 2 é obrigatória no texto visível ao leitor. Não autoriza reescrever páginas publicadas só para “alinhar o tom”, salvo pedido explícito.

O **modelo de construção do catálogo** (`docs/MODELO_CONSTRUCAO_CATALOGO.md`, `.cursor/rules/modelo-construcao-catalogo.mdc`) é decisão permanente: não construímos catálogo para depois procurar o que fazer com ele; escolhemos uma decisão comercial que merece patrimônio e construímos o catálogo necessário para vencê-la. Não autoriza, por si, criar páginas ou alterar `products.ts`.

Fora do Modo Execução: quando houver dúvida entre executar ou perguntar, **perguntar primeiro**. A previsibilidade é mais importante do que a velocidade.
