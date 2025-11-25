# Design System - Projeto Vitória Cestas

## Fundamentos
- **Tipografia:** Inter, system-ui, sans-serif. Pesos 400 (corpo) e 600+ (títulos).
- **Cores:**
  - Primária: `#1d4ed8` (hover `#1e40af`)
  - Secundária: `#f59e0b`
  - Superfície: `#ffffff`
  - Fundo: `#f8fafc`
  - Texto: `#0f172a`
  - Muted: `#64748b`
  - Borda: `#e2e8f0`
- **Espaçamento:** função `spacing(fator)` retorna `fator * 8px`.
- **Raios:** sm 6px, md 10px, lg 16px.
- **Sombras:** sm `0 1px 2px rgba(15,23,42,0.06)`, md `0 4px 10px rgba(15,23,42,0.08)`.

## Componentes
- **Button:** variantes `primary`, `secondary`, `ghost`; tamanhos `sm|md|lg`; opção `fullWidth`.
- **Input:** label opcional, estados de erro/ajuda, foco com realce primário.
- **Card:** contêiner com títulos/subtítulos e área de ações; usa borda e sombra suave.
- **Table:** cabeçalhos fixos, estado vazio e `render` customizável por coluna.
- **Modal:** backdrop translúcido, botão de fechar, conteúdo centralizado responsivo.

## Padrões de Layout
- Containers usam `max-width` fluido com grids responsivos `repeat(auto-fit, minmax(240px,1fr))` para formulários.
- Navegação fixa no topo; botões ghost para abas, primário para estado ativo.
- As páginas iniciais incluídas: Login, Cadastro de Item (estoque) e Cadastro de Fornecedor.

## Acessibilidade
- Foco visível em inputs e botões; modais possuem `role="dialog"` e backdrop fecha ao clicar fora.
- Campos e botões mapeados com `aria-invalid` quando há erro.

## Documentação e Testes
- **Storybook:** `npm run storybook` para explorar os componentes, stories em `src/**/*.stories.tsx`.
- **Testes:** React Testing Library + Vitest, setup em `src/setupTests.ts`.
