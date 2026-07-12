# PADRÕES DE COMPONENTES – CASA PRÁTICA ELETRO

**Status:** documentação permanente (estrutura oficial)  
**Caminho canônico:** `docs/PADROES_DE_COMPONENTES.md`

### Como usar

1. Antes de criar UI nova, verifique se já existe componente reutilizável.
2. Melhoria **só editorial** → não criar nem alterar componentes/templates.
3. Quando um padrão de componente mudar, atualize **este arquivo** e o `CHANGELOG.md`.

Documentação relacionada: `MANUAL_DESIGN_SYSTEM.md` (SSOT visual), `MANUAL_PAGINA_DECISAO.md`, `site-blueprint.md`.

---

## 1. Objetivo

Centralizar quando e como reutilizar componentes Astro do projeto, evitando duplicação e drift visual.

---

## 2. Regras gerais

- Preferir componentes existentes em `src/components/`
- Não inventar componente novo para ajuste de texto de guia afiliado
- Alteração de componente global exige confirmação explícita (regra do projeto)

---

## 3. Shell global

| Componente | Uso |
|------------|-----|
| `BaseLayout.astro` | Layout HTML, head, OG |
| `Header.astro` | Navegação |
| `Footer.astro` | Rodapé |
| `WhatsAppFloat.astro` | CTA flutuante |

<!-- Expandir props e restrições conforme necessário. -->

---

## 4. Conteúdo e confiança

| Componente | Uso |
|------------|-----|
| `Breadcrumbs.astro` | Trilha |
| `EditorialTrustRibbon.astro` | Faixa de confiança |
| `RelatedContent.astro` | Leituras relacionadas |
| `SmartRecommendations.astro` | Próximos passos editoriais |

---

## 5. Blocos comerciais (guias afiliados)

| Componente | Uso |
|------------|-----|
| `HomeTopProducts.astro` | Cards de produtos / ofertas |
| `HomeComparisonTable.astro` | Tabela comparativa |

Dados: `src/data/commercialGuideBlocks.ts`, `src/data/products.ts`.

Em Páginas de Decisão, CTAs de compra devem permanecer nestes blocos + markdown de review — ver `MANUAL_PAGINA_DECISAO.md` (CTAs e afiliados).

---

## 6. Home e marketing

| Componente | Uso |
|------------|-----|
| `Hero.astro` | Hero da home |
| Demais seções home | Documentar conforme uso estável |

---

## 7. Quando é permitido criar componente novo

Somente com decisão explícita do projeto, e após:

1. Confirmar que não há equivalente
2. Alinhar com `MANUAL_DESIGN_SYSTEM.md`
3. Registrar neste manual + `CHANGELOG.md`

---

## 8. O que não fazer

- Não alterar template de `/melhores/[slug]` só para “ficar melhor o texto”
- Não duplicar markup de card/tabela dentro do markdown
- Não acoplar copy editorial hardcoded em componente sem necessidade

---

## 9. Checklist

- [ ] Componente existente reutilizado quando possível
- [ ] Props documentadas aqui se forem padrão novo
- [ ] Nenhuma mudança estrutural sem pedido explícito
