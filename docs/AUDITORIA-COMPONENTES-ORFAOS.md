# Auditoria — componentes e utilitários órfãos

**Data:** 2026-07-24  
**Escopo:** imports em `src/pages`, `src/layouts`, `src/components`, `src/data`, `src/modules`.  
**Ação desta manutenção:** **somente relatório**. Nada foi removido.

---

## Candidatos a remoção / arquivo

| Arquivo | Motivo | Impacto se removido | Confiança |
|---------|--------|---------------------|-----------|
| `src/components/AboutSection.astro` | Nenhum import no projeto | Nenhum no site atual; perde bloco legado para landings futuras | Alta |
| `src/components/LeadFormSection.astro` | Nenhum import | Idem (formulário estático não usado) | Alta |
| `src/components/NewsletterBar.astro` | Nenhum import | Idem | Alta |
| `src/components/ProcessSection.astro` | Nenhum import | Idem | Alta |
| `src/components/ServiceRows.astro` | Nenhum import | Idem | Alta |
| `src/components/TestimonialSection.astro` | Nenhum import | Idem | Alta |
| `src/components/RelatedArticles.astro` | Nenhuma página importa; fluxo ativo usa `RelatedContent.astro` | Remove UI legada; páginas atuais inalteradas | Alta |
| `src/data/relatedPages.ts` | Só consumido por `RelatedArticles.astro` (também órfão). É shim fino sobre `editorialContent.ts` | Zero impacto no runtime atual; quebra só se alguém reativar `RelatedArticles` sem o shim | Alta |

---

## Utilitário sem uso em runtime (manter por enquanto)

| Arquivo | Motivo | Impacto se removido | Confiança |
|---------|--------|---------------------|-----------|
| `src/utils/mercadoLivreAffiliate.ts` (+ `.test.ts`) | Não importado por páginas/componentes/monitor; só testes e menção em comentário de `products.ts` | Perde classificação estrita de afiliado ML e cobertura de testes; útil como ferramenta de qualidade | Média |

**Recomendação:** não remover automaticamente. Ou integrar no fluxo operacional (monitor / checklist) ou arquivar quando houver limpeza aprovada.

---

## Não são órfãos (confirmados em uso)

Exemplos: `Header`, `Footer`, `Hero`, `HomeTopProducts`, `HomeComparisonTable`, `HomeGuideSection`, `HomeMelhoresSection`, `HomeSeeAlso`, `HomeFaqSection`, `BlogGrid`, `LogoStrip`, `Breadcrumbs`, `EditorialTrustRibbon`, `AffiliateOfferBlock`, `EditorialLinks`, `SmartRecommendations`, `RelatedContent`, `ProductMedia`, `WhatsAppFloat`, `YouTubeBrandLink`, `HeaderPrimaryNavLinks`.

Utils em uso: `isNavActive.ts`, `readingTime.ts`.

---

## Duplicação conceitual (não é arquivo morto)

| Par | Observação | Ação sugerida |
|-----|------------|---------------|
| `RelatedArticles` vs `RelatedContent` | Dois componentes de “relacionados”; só o segundo está no funil ativo | Remover `RelatedArticles` após aprovação (ver tabela acima) |
| `relatedPages.ts` vs `editorialContent.ts` | `relatedPages` já delega a `editorialContent` | Remover shim junto com `RelatedArticles` |

---

## Próximo passo

Aprovação humana para: (a) remover órfãos de landing, (b) remover par `RelatedArticles` + `relatedPages`, (c) decidir destino de `mercadoLivreAffiliate.ts`.
