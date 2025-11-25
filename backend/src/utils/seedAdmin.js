import { query } from '../db.js';
import { config } from '../config.js';
import { hashPassword } from '../security/password.js';

export async function seedAdmin() {
  if (!config.seed.email || !config.seed.password) return;

  const { rows } = await query('SELECT id FROM users WHERE email=$1', [config.seed.email]);
  if (rows.length > 0) return;

  const passwordHash = await hashPassword(config.seed.password);
  await query('INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)', [
    config.seed.email,
    passwordHash,
    config.seed.role
  ]);
  // eslint-disable-next-line no-console
  console.log(`Usuário seed criado: ${config.seed.email} (${config.seed.role})`);
}
