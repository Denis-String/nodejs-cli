import Fastify, { FastifyInstance } from 'fastify';
import { healthRoutes } from './health';

describe('Serviço health', () => {
  let fastify: FastifyInstance;

  beforeEach(async () => {
    fastify = Fastify();
    fastify.register(healthRoutes);
    await fastify.ready();
  });

  afterEach(async () => {
    await fastify.close();
  });

  it('Deve retornar status 200', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/health/check',
    });

    expect(response.statusCode).toBe(200);
  });
});
