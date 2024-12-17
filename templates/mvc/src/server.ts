import initialize from './plugins/initialize';

import routes from './routes/register';
import middlewares from './middlewares/register'
import plugins from './plugins/register'

import Fastify from 'fastify';

async function startServer() {
  // @ts-ignore
  for (const init of initialize) await init();

  const server = Fastify({ logger: true });

  routes.forEach((route) => route(server))
  // @ts-ignore
  middlewares.forEach((middleware) => middleware(server))
  // @ts-ignore
  plugins.forEach((plugin) => plugin(server))

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
