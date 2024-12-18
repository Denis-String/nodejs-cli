import { FastifyInstance } from 'fastify';
import { healthCheckHandler } from '../controllers/health/check';
import createRouteHandler from './createRouteHandler';
// import authenticate from '../middlewares/authenticate';

export function healthRoutes(server: FastifyInstance) {
  server.route({
    method: 'GET',
    url: '/health/check',
    // preHandler: authenticate,
    handler: createRouteHandler(healthCheckHandler)
  });
}
