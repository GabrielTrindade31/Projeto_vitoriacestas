import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  app.use('/auth', authRoutes);
  app.use('/protected', protectedRoutes);

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Erro interno' });
  });

  return app;
}
