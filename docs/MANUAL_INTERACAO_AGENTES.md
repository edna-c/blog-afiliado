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

---

# Princípio Geral

Quando houver dúvida entre executar ou perguntar,

o agente deverá sempre perguntar primeiro.

A previsibilidade é mais importante do que a velocidade.
