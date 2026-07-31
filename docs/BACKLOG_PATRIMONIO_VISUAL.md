# BACKLOG — Patrimônio Visual (operacional)

**Status:** fila operacional do Motor III — **não** é SSOT.  
**Caminho canônico:** `docs/BACKLOG_PATRIMONIO_VISUAL.md`  
**SSOT permanente:** `docs/BIBLIOTECA_VISUAL.md`

Este arquivo guarda priorizações, sprints, tarefas e recomendações de implementação.  
Pode mudar a qualquer momento sem invalidar o SSOT.

**Fase:** arquitetura permanente **estabelecida** · ativos = **1ª geração** · evolução incremental (consistência, reuso, componentes, UX, cobertura) — não experimento de conceito.

**Princípio:** Biblioteca Técnica = sistema editorial reutilizável (não coleção de imagens). Cada ativo deve servir múltiplas páginas.

**Meta v1.0:** 20–30 ativos fundamentais · mesmo DNA visual · reuso em dezenas de páginas.  
**Ritmo até v1.0:** consistência > quantidade — não expandir rápido; preferir v2 / wiring / padronização.

**Princípio permanente:** *Aprofundar o DNA, não inflar o inventário.*  
**Teste de admissão:** todo novo ativo deve tornar a biblioteca melhor do que era antes — senão não entra.  
**DNA visual:** fotografia editorial de produto real — **não** renderização perfeita / aspecto sintético.

**Pós–v1.0:** ritual de coerência da coleção (v2.0) antes de expansão temática ampla — ver SSOT.

---

## Fluxo de decisão (operacional)

```text
1. Inventário completo          → SSOT
2. Biblioteca organizada        → SSOT
3. Mapa de reutilização         → SSOT
4. Lacunas completas (A/B)      → SSOT
       ↓ GATE
5. Ranking (Tipo B antes de A)  → backlog
6. Sprint Visual / 1º ativo     → backlog (aprovação humana antes de implementar)
```

Antes de recomendar ativo: responder as 4 perguntas de classificação (ver regra Motor III / Prompt §9).

---

## Status do diagnóstico (gate)

| Etapa | Onde | Status |
|-------|------|--------|
| 1. Inventário | SSOT §1 | Concluído (119 arquivos: 66 canônicos + 53 staging) |
| 2. Biblioteca | SSOT §2 | Concluído |
| 3. Mapa de reutilização | SSOT §3 | Concluído |
| 4. Lacunas | SSOT §4 (L01–L17 + Tipo A/B) | Concluído |

**Gate fechado.** Ranking abaixo segue a prioridade **Tipo B > Tipo A**.

---

## Caminho até Biblioteca Técnica v1.0

| Item | Estado |
|------|--------|
| Meta | 20–30 ativos fundamentais · mesmo DNA · reuso em dezenas de URLs |
| Incorporados Tipo B (hoje) | L06A, L09A (+ staging L05A/L06B/L07A sem wiring) |
| **DNA de referência** | **L06A** (ativa) + **L08A** (designada — interior forno; arte pendente) |
| Ritmo | Consistência > quantidade — **não** abrir dezenas de artes novas antes do DNA único |
| Próximo bloco (evolução, não explosão) | (1) Produzir **L08A** no DNA de L06A · (2) **Evoluir L07A/L09A** (só remover texto) · (3) **Repensar L05A** (separar conceitos) · (4) pipeline único no blog · (5) wiring reuso L06A · **sem** regenerar a biblioteca inteira |
| Após v1.0 | Ritual de coerência da coleção (checklist v2.0 no SSOT) → só então expansão temática ampla |

### Destino 1ª geração (aprovada — lapidar)

| ID | Postura |
|----|---------|
| L06A | Manter · âncora DNA (pedagogia visual) |
| L08A | Produzir como âncora DNA (forno) |
| L07A / L09A | Evoluir — excelentes conceitos; perder texto |
| L05A | Repensar — separar conceitos (não por estética) |
| L06B | Validar escopo |
| **Não** | Refazer tudo no gerador |

---

## Ranking de prioridades (2026-07-28 — reprocessado)

Critérios: (1) **Tipo B antes de A**, (2) potencial de reuso, (3) sem substituto honesto no SSOT, (4) impacto na decisão de compra.

### Fila Tipo B — Patrimônio Técnico

| Rank | ID | Ativo | Reuso | Nota |
|------|-----|-------|-------|------|
| 1 | L06 | Tipologia trempes | Alto | Critério transversal hubs/reviews/guias |
| 2 | L07 | Tipologia queimadores | Alto | Idem |
| 3 | L03+L04 | Close-ups tampo vidro e inox | Médio–Alto | Cluster acabamento permanente |
| 4 | L02 | Top-down 4 × 5 bocas | Médio | Conceito técnico de mesa / simultaneidade |
| 5 | L08 | Interior forno simples | Médio–Alto | Critério forno em reviews/hubs |
| 6 | L05 | Split vidro × inox | Médio | Após L03+L04 (ou em paralelo se uma arte só) |
| 7 | L10+L11 | Gabaritos 4b e 5b | Médio | Checklists / como escolher |
| 8 | L15 | Grades / estabilidade | Médio | Critério prático |
| 9 | L16 | Forno simples × duplo | Médio | Nicho forno |
| 10 | L09 | Painel / acendimento | Médio | UX |
| 11 | L12 | Gabarito / folgas embutir | Baixo–Médio | Instalação técnica |

### Fila Tipo A — Editorial (só após gaps B prioritários)

| Rank | ID | Ativo | Reuso | Nota |
|------|-----|-------|-------|------|
| A1 | L01 | Embutir × piso (cenário) | Baixo–Médio | **Incorporado** no guia (IMG01). Reuso B/C opcional depois |
| A2 | L17 | Lifestyle embutir | Baixo | Só se ainda agregar além de L01 |

### Comercial (fora do ranking A/B)

| ID | Ativo | Nota |
|----|-------|------|
| L13+L14 | Packshots review 4b / vidro | Sob demanda de URL review |

**Fora desta sprint (manutenção):** higiene staging; dedupe packshots; proporção heroes 5b; wiring de ociosos.

---

## Sprint Visual nº 1 — SUPERSEDED

**Estado:** plano antigo (L01 embutir×piso como 1º ativo) **invalidado** pela classificação A/B.  
L01 é **Tipo A (Editorial)** — útil para o guia, mas não forma patrimônio técnico.

Arte eventual de L01 (se já produzida / em validação) pode ser incorporada como Editorial sem alterar a fila B.

---

## Sprint Visual nº 1 — CONCLUÍDA (Tipo B)

**Estado:** L06A Incorporado · wiring 1ª leva feito.

### Ativos Incorporados

| ID | Tema | Path | Wiring |
|----|------|------|--------|
| **L06A** | Ferro fundido × aramada esmaltada | `library/L06A.webp` | Custo-benefício 5b · reviews 5b · Brastemp vale a pena |
| **L09A** | Forno simples × forno duplo | `library/L09A.webp` | Blog forno duplo |

### Staging (Produzido — sem wiring)

| ID | Tema | Decisão |
|----|------|---------|
| L07A | Chama simples/dupla/tripla | **Evoluir** — perder texto |
| L09A | Forno simples × duplo (já Incorporado) | **Evoluir** — perder texto/callouts; alinhar DNA |
| L05A | Mesa vidro × inox | **Validado v2** — sem texto; eixo único (tampo); wiring pendente |
| L06B | Trempe contínua × individuais | Validar escopo |
| L08A | Interior forno (âncora DNA) | **Produzir** no DNA de L06A |

### Componente

`TechnicalFigure.astro` + alias `ArticleTechnicalFigure.astro` · registry `technicalLibrary.ts`

### Brief L06A (referência)

| Item | Spec |
|------|------|
| Conceito | Esquerda = ferro fundido · Direita = aramada esmaltada |
| Formato | Horizontal · 1500×1000 · WebP |
| Proibido (ideal) | Marca, logo, texto, panela, queimador, cozinha |
| Alt / legenda | Defaults em `technicalLibrary.ts` |

### Critérios de sucesso

- [x] L06A Incorporado com ficha de governança  
- [x] Mesmo master em ≥3 URLs  
- [x] L09A Incorporado na URL-dona forno duplo  
- [ ] L07A sem texto (v2) antes de wiring  

---

## Histórico

| Data | Evento |
|------|--------|
| 2026-07-28 | Ranking inicial; L01 como 1º ativo |
| 2026-07-28 | Separação SSOT × backlog |
| 2026-07-28 | Diagnóstico gate fechado; Sprint Visual nº 1 — plano L01 |
| 2026-07-28 | **Evolução A/B:** L01 reclassificado Editorial; ranking B-first; Sprint nº 1 → L06 |
| 2026-07-28 | L01/IMG01 Incorporado no guia embutir×piso (aprovação humana) |
| 2026-07-29 | **L06A** brief travado: ferro fundido × aramada esmaltada (1 master) |
| 2026-07-30 | Status Oficial + Princípio Fundamental (sistema editorial, não coleção) |
| 2026-07-30 | Meta v1.0: 20–30 ativos · DNA único · ritmo consistência > quantidade |
| 2026-07-30 | Princípio permanente + ritual v2.0 (coerência da coleção) |
| 2026-07-30 | 1ª geração aprovada: evoluir L07A/L09A · repensar L05A · não regenerar tudo |
| 2026-07-30 | DNA: fotografia editorial real — não renderização perfeita |
