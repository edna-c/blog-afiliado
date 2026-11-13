# Dívidas Técnicas

**Responsabilidade deste arquivo:** decisões conscientemente adiadas e pendências conhecidas.  
Não é backlog de implementação e não autoriza alteração por si só.

Governança, princípios e critérios de evolução: `docs/ROADMAP-PLATAFORMA.md` (documento normativo).  
Estado atual: `README.md`.  
Origem dos itens: `docs/AUDITORIA-SSOT-AFILIADOS.md`, `docs/AUDITORIA-COMPONENTES-ORFAOS.md`.

---

## Item 1 — Links afiliados hardcoded nos fragments Markdown

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Links afiliados com `href` literal em fragments Markdown dos guias Melhores (`_melhor-fogao-4-bocas-justificativas.md`, `_melhor-fogao-mesa-de-vidro-justificativas.md`) — 12 ocorrências. |
| **Situação atual** | **Resolvido (2026-11-12):** CTAs migrados para `Fogao4BocasJustificativas.astro` e `FogaoMesaDeVidroJustificativas.astro` via `ProductOfferCtas` (SSOT `products.ts`). Os `.md` ficaram como stub/âncora, no padrão dos cooktops. |
| **Motivo de permanecer pendente** | — |
| **Risco atual** | Residual: `_melhor-fogao-5-bocas-antes.md` ainda tem CTA hardcoded (fora deste item; não alterar sob CRO-003). |
| **Prioridade** | — |
| **Gatilho para revisão** | Rotação de ofertas no inventário; eventual migração do CTA em `_melhor-fogao-5-bocas-antes.md` após veredito CRO-003. |
| **Decisão tomada** | **Encerrado para 4 bocas e mesa de vidro** com aprovação explícita de padronização SSOT. |

---

## Item 2 — Componentes, utilitários e arquivos candidatos a órfãos

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Componentes sem import no funil ativo (`AboutSection`, `LeadFormSection`, `NewsletterBar`, `ProcessSection`, `ServiceRows`, `TestimonialSection`, `RelatedArticles`) e o shim `src/data/relatedPages.ts`. |
| **Situação atual** | No repositório; fora do fluxo publicado. Interlinkagem ativa: `RelatedContent` + `editorialContent.ts`. |
| **Motivo de permanecer pendente** | Validar uso futuro. Baixo impacto operacional. |
| **Risco atual** | Baixo — ruído de manutenção. |
| **Prioridade** | Baixa |
| **Gatilho para revisão** | Nova revisão arquitetural (conforme ROADMAP) ou reorganização da camada de apresentação. |
| **Decisão tomada** | **Não remover.** |

---

## Item 3 — `mercadoLivreAffiliate.ts`

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Classificação estrita de links ML (`src/utils/mercadoLivreAffiliate.ts` + testes). |
| **Situação atual** | Usado em testes; sem import em páginas/componentes/monitor em runtime. |
| **Motivo de permanecer pendente** | Testes e possível reaproveitamento operacional. |
| **Risco atual** | Baixo. |
| **Prioridade** | Baixa |
| **Gatilho para revisão** | Evolução da camada operacional de afiliados (ver ROADMAP). |
| **Decisão tomada** | **Manter.** |

---

# Critério para Revisão

Nenhuma dívida deste arquivo deve ser tratada **apenas porque existe**.

Revisar somente quando o gatilho do item ocorrer **e** a proposta passar pela **Política Permanente de Governança** no ROADMAP.

Enquanto isso: **manter a implementação atual**.
