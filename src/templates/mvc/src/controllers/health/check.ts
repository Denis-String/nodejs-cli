// import { FastifyRequest } from 'fastify';
import healthCheck from '../../services/health/check';

export function healthCheckHandler(/* request: FastifyRequest */) {
  return healthCheck(/* request */);
}
