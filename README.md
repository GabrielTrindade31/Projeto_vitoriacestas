# Projeto Vitória Cestas

Guia rápido de implantação no Vercel para o frontend (Vite + React + TypeScript) e backend (Express + Postgres + JWT).

## Deploy do frontend (Vercel)
- **Framework preset:** Other
- **Root directory:** deixe em branco; o `vercel.json` na raiz já aponta a build para `frontend`.
- **Build command:** usar o padrão do `vercel.json` (`npm install && npm run build` rodando dentro de `frontend`).
- **Output directory:** o `@vercel/static-build` já publica o `frontend/dist`.
- **Routes / 404:** o `vercel.json` inclui um fallback `/(.*) -> /index.html` para evitar 404 em rotas do SPA. Se você abriu a URL principal e viu `404_NOT_FOUND`, redeploy com o `vercel.json` em vigor ou ajuste a `root directory` para `frontend`.
- **Environment variables:** normalmente não são necessárias para o build atual. Se for consumir o backend, adicione a URL da API (ex.: `VITE_API_URL=https://sua-api.vercel.app`).

## Deploy do backend (Vercel)
- **Framework preset:** Other
- **Root directory:** `backend`
- **Build command:** `npm install`
- **Output directory:** deixar em branco (API Node executa via `npm start`).
- **Start command:** `npm start` (Vercel detecta automaticamente se estiver configurado como app Node). Se preferir serverless, adapte o código para handlers em `/api`.
- **Environment variables:** copie do `.env.example` e preencha com as credenciais de Postgres e segredos JWT:
  - `PORT` (opcional, Vercel define `PORT` automaticamente)
  - `DATABASE_URL`
  - `JWT_SECRET`, `JWT_EXPIRES_IN`
  - `REFRESH_SECRET`, `REFRESH_EXPIRES_IN`
  - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_ROLE`

Use os valores de conexão fornecidos pelo Neon no formulário de variáveis de ambiente do Vercel, preservando `sslmode=require` na string de conexão.
