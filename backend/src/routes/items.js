import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
import { query } from '../db.js';

const router = Router();
const rolesWithWriteAccess = ['ADMIN', 'GESTOR'];
const rolesWithReadAccess = ['ADMIN', 'GESTOR', 'OPERADOR'];

const serializeItem = (row) => ({
  id: row.id,
  nome: row.nome,
  codigo: row.codigo,
  custo: Number(row.custo),
  preco: Number(row.preco),
  estoque: Number(row.estoque),
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const validateItemPayload = (body, { allowCodeChange, originalCode }) => {
  const errors = [];
  const payload = {
    nome: body?.nome,
    codigo: body?.codigo,
    custo: body?.custo,
    preco: body?.preco,
    estoque: body?.estoque
  };

  if (!payload.nome) errors.push('Nome é obrigatório.');
  if (!payload.codigo) errors.push('Código é obrigatório.');
  if (payload.custo === undefined || payload.custo === null || Number.isNaN(Number(payload.custo))) {
    errors.push('Custo é obrigatório e deve ser numérico.');
  }
  if (payload.preco === undefined || payload.preco === null || Number.isNaN(Number(payload.preco))) {
    errors.push('Preço é obrigatório e deve ser numérico.');
  }
  if (payload.estoque === undefined || payload.estoque === null || Number.isNaN(Number(payload.estoque))) {
    errors.push('Estoque é obrigatório e deve ser numérico.');
  }

  if (!allowCodeChange && body?.codigo && body.codigo !== originalCode) {
    errors.push('Código do item não pode ser alterado.');
  }

  return {
    errors,
    payload: {
      nome: payload.nome,
      codigo: payload.codigo,
      custo: Number(payload.custo),
      preco: Number(payload.preco),
      estoque: Number(payload.estoque)
    }
  };
};

router.use(authenticate);

router.get('/', authorizeRole(rolesWithReadAccess), async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM items ORDER BY created_at DESC');
    return res.json(rows.map(serializeItem));
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', authorizeRole(rolesWithReadAccess), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await query('SELECT * FROM items WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    return res.json(serializeItem(rows[0]));
  } catch (error) {
    return next(error);
  }
});

router.post('/', authorizeRole(rolesWithWriteAccess), async (req, res, next) => {
  try {
    const { errors, payload } = validateItemPayload(req.body, { allowCodeChange: true });
    if (errors.length) {
      return res.status(400).json({ message: errors.join(' ') });
    }

    const { rows } = await query(
      `INSERT INTO items (nome, codigo, custo, preco, estoque) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [payload.nome, payload.codigo, payload.custo, payload.preco, payload.estoque]
    );

    return res.status(201).json(serializeItem(rows[0]));
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Código já cadastrado.' });
    }
    return next(error);
  }
});

router.put('/:id', authorizeRole(rolesWithWriteAccess), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows: existingRows } = await query('SELECT * FROM items WHERE id = $1', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    const existing = existingRows[0];
    const payloadSource = { ...existing, ...req.body };
    const { errors, payload } = validateItemPayload(payloadSource, {
      allowCodeChange: false,
      originalCode: existing.codigo
    });

    if (errors.length) {
      return res.status(400).json({ message: errors.join(' ') });
    }

    const updateQuery = `
      UPDATE items
      SET nome = $1, custo = $2, preco = $3, estoque = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;

    const { rows } = await query(updateQuery, [payload.nome, payload.custo, payload.preco, payload.estoque, id]);
    const updated = rows[0];

    const changes = {};
    if (existing.nome !== updated.nome) {
      changes.nome = { from: existing.nome, to: updated.nome };
    }

    ['custo', 'preco', 'estoque'].forEach((field) => {
      if (Number(existing[field]) !== Number(updated[field])) {
        changes[field] = { from: existing[field], to: updated[field] };
      }
    });

    await query(
      'INSERT INTO audit_logs (item_id, user_id, action, changes) VALUES ($1, $2, $3, $4)',
      [id, req.user?.id ?? null, 'UPDATE', Object.keys(changes).length ? changes : null]
    );

    return res.json(serializeItem(updated));
  } catch (error) {
    return next(error);
  }
});

export default router;
