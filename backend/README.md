# Backend Node.js (Express + JWT + Postgres)

API REST com autenticação por email/senha, geração de JWT com refresh token, rate limiting e controle de permissões por perfil (Admin, Gestor, Operador). Usa Postgres via `pg`.

## Requisitos
- Node.js 18+
- Banco Postgres acessível (use `DATABASE_URL` do `.env`)

## Configuração
1. Copie o `.env.example` para `.env` e ajuste as variáveis (incluindo as credenciais fornecidas de Postgres).
2. Instale as dependências:
   ```bash
   cd backend
   npm install
   ```
3. Execute o servidor:
   ```bash
   npm run dev  # hot reload
   # ou
   npm start
   ```

Na subida o servidor cria automaticamente as tabelas `users` e `refresh_tokens` (se não existirem) e pode criar um usuário seed se `SEED_ADMIN_EMAIL` e `SEED_ADMIN_PASSWORD` estiverem definidos.

## Endpoints principais
- `POST /auth/register` — cria usuário (Admin/Gestor/Operador) e retorna tokens.
- `POST /auth/login` — login com email e senha; retorna access e refresh token.
- `POST /auth/refresh` — rota de rotação do refresh token.
- `POST /auth/logout` — revoga refresh token (requer access token).
- `GET /auth/me` — retorna dados do usuário autenticado.
- Rotas protegidas por role: `/protected/admin-only`, `/protected/gestor-ou-admin`, `/protected/operador`.

## Segurança
- Hash de senhas com `bcrypt`.
- Access token com expiração (`JWT_EXPIRES_IN`, padrão 15m).
- Refresh token com expiração (`REFRESH_EXPIRES_IN`, padrão 7d) e rotação armazenada em tabela.
- Rate limiting aplicado às rotas de autenticação (10 requisições/minuto).

## Estrutura de pastas
- `src/server.js` — bootstrap, schema e seed.
- `src/routes/` — rotas públicas e protegidas.
- `src/middleware/` — autenticação, autorização e rate limit.
- `src/security/` — helpers de senha e JWT.
- `.env.example` — variáveis de ambiente.
