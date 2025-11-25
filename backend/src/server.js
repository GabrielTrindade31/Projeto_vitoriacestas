import { createApp } from './app.js';
import { config } from './config.js';
import { ensureSchema } from './db.js';
import { seedAdmin } from './utils/seedAdmin.js';

async function bootstrap() {
  try {
    await ensureSchema();
    await seedAdmin();
    const app = createApp();
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`API escutando na porta ${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao iniciar servidor', error);
    process.exit(1);
  }
}

bootstrap();
