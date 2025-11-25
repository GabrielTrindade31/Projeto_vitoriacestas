import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = Router();

router.get('/admin-only', authenticate, authorizeRole(['ADMIN']), (req, res) => {
  res.json({ message: 'Acesso concedido para Admin' });
});

router.get('/gestor-ou-admin', authenticate, authorizeRole(['ADMIN', 'GESTOR']), (req, res) => {
  res.json({ message: 'Acesso para Gestor ou Admin' });
});

router.get('/operador', authenticate, authorizeRole(['ADMIN', 'GESTOR', 'OPERADOR']), (req, res) => {
  res.json({ message: 'Acesso para Operador, Gestor ou Admin' });
});

export default router;
