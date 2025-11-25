import { Router } from 'express';
import { query } from '../db.js';
import { hashPassword, verifyPassword } from '../security/password.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { authenticate } from '../middleware/authenticate.js';
import { generateSession, rotateRefreshToken, revokeRefreshToken } from '../security/tokens.js';

const router = Router();
const roles = ['ADMIN', 'GESTOR', 'OPERADOR'];

router.post('/register', authLimiter, async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, senha e role são obrigatórios' });
  }
  if (!roles.includes(role)) {
    return res.status(400).json({ message: 'Role inválida' });
  }

  const { rows: existing } = await query('SELECT id FROM users WHERE email=$1', [email]);
  if (existing.length > 0) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  const passwordHash = await hashPassword(password);
  const { rows } = await query(
    'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
    [email, passwordHash, role]
  );
  const user = rows[0];
  const tokens = await generateSession(user);
  return res.status(201).json({ user, ...tokens });
});

router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  const { rows } = await query('SELECT * FROM users WHERE email=$1', [email]);
  const user = rows[0];
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const tokens = await generateSession(user);
  return res.json({ user: { id: user.id, email: user.email, role: user.role }, ...tokens });
});

router.post('/refresh', authLimiter, async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token é obrigatório' });
  }

  const rotated = await rotateRefreshToken(refreshToken);
  if (!rotated) {
    return res.status(401).json({ message: 'Refresh token inválido ou expirado' });
  }

  return res.json(rotated);
});

router.post('/logout', authenticate, async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }
  return res.status(204).send();
});

router.get('/me', authenticate, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
