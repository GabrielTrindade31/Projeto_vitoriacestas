# Projeto Vitória Cestas

Guia rápido de implantação no Vercel para o frontend (Vite + React + TypeScript) e backend (Express + Postgres + JWT).

## Deploy do frontend (Vercel)
- **Framework preset:** Other
- **Root directory:** `frontend`
- **Build command:** `npm install && npm run build`
- **Output directory:** `dist` (gerado pelo Vite)
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
