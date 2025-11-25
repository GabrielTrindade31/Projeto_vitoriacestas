import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { query } from '../db.js';
import crypto from 'crypto';

function signAccessToken(user) {
  return jwt.sign({ sub: user.id, role: user.role, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
}

function signRefreshToken(user) {
  return jwt.sign({ sub: user.id }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiresIn });
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function generateSession(user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  const decoded = jwt.decode(refreshToken);
  const expiresAt = new Date(decoded.exp * 1000);
  const tokenHash = hashToken(refreshToken);
  await query(
    'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
    [user.id, tokenHash, expiresAt]
  );
  return { accessToken, refreshToken };
}

export async function rotateRefreshToken(token) {
  const tokenHash = hashToken(token);
  const { rows } = await query(
    'SELECT rt.*, u.email, u.role FROM refresh_tokens rt JOIN users u ON u.id = rt.user_id WHERE token_hash=$1 AND revoked_at IS NULL AND expires_at > NOW()',
    [tokenHash]
  );
  const stored = rows[0];
  if (!stored) return null;

  try {
    jwt.verify(token, config.jwt.refreshSecret);
  } catch (err) {
    return null;
  }

  await query('UPDATE refresh_tokens SET revoked_at = NOW() WHERE id=$1', [stored.id]);
  const user = { id: stored.user_id, email: stored.email, role: stored.role };
  return generateSession(user);
}

export async function revokeRefreshToken(token) {
  const tokenHash = hashToken(token);
  await query('UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash=$1', [tokenHash]);
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.jwt.secret);
}
