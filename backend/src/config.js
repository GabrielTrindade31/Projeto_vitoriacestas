import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.REFRESH_SECRET || 'dev-refresh-secret',
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '7d'
  },
  seed: {
    email: process.env.SEED_ADMIN_EMAIL,
    password: process.env.SEED_ADMIN_PASSWORD,
    role: process.env.SEED_ADMIN_ROLE || 'ADMIN'
  }
};

if (!config.databaseUrl) {
  // eslint-disable-next-line no-console
  console.warn('\u26a0\ufe0f DATABASE_URL não configurada. Defina no .env.');
}
