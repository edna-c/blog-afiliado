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
| **Situação atual** | URLs coincidem com `src/data/products.ts`, mas a fonte está duplicada (inventário + Markdown). |
| **Motivo de permanecer pendente** | Conteúdo já publicado. Baixo risco imediato. Evitar impacto em rastreamento de afiliados. |
| **Risco atual** | Baixo — divergência futura se o inventário for atualizado sem o Markdown. |
| **Prioridade** | Baixa |
| **Gatilho para revisão** | Infraestrutura apropriada (Product Catalog ou Article Builder no ROADMAP), ou manutenção repetitiva comprovada na rotação de ofertas. |
| **Decisão tomada** | **Não alterar** até o gatilho. Correção só com aprovação humana explícita. |

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
