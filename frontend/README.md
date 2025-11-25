# Frontend (React + TypeScript)

Biblioteca de componentes UI, Storybook e três telas iniciais (login, cadastro de item, cadastro de fornecedor) para o Projeto Vitória Cestas.

## Pré-requisitos
- Node.js 18+
- npm

## Scripts
- `npm install` — instala dependências.
- `npm run dev` — inicia o Vite em modo desenvolvimento.
- `npm run build` — build de produção.
- `npm run preview` — serve o build.
- `npm run test` — executa testes (Vitest + React Testing Library).
- `npm run storybook` — abre a documentação de componentes.
- `npm run build-storybook` — build estático do Storybook.

## Estrutura
- `src/components/` — Button, Input, Table, Modal, Card e exportações.
- `src/pages/` — Login, Cadastro de Item (estoque) e Cadastro de Fornecedor.
- `src/styles/` — tema, tipagem do styled-components e estilos globais.
- `src/**/*.stories.tsx` — stories dos componentes.
- `src/**/*.test.tsx` — testes dos componentes.

## Integração com backend
As telas de formulário atualmente salvam os dados em estado local. Para conectar ao backend, substitua os comentários `TODO` nas páginas por chamadas à API.
