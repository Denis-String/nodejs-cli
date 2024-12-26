// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import initialize from './plugins/initialize';

import routes from './routes/register';
import middlewares from './middlewares/register';
import plugins from './plugins/register';

import Fastify from 'fastify';

async function startServer() {
  for (const init of initialize) await init();

  const server = Fastify({ logger: true });

  routes.forEach((route) => route(server));
  middlewares.forEach((middleware) => middleware(server));
  plugins.forEach((plugin) => plugin(server));

  server.listen({ port: 3000 }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`Server listening at ${address}`);
  });
}

startServer().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
  process.exit(1);
});
