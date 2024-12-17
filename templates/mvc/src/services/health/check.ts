import { FastifyRequest } from "fastify";

export default async function healthCheck(request: FastifyRequest) {
  return {
    statusCode: 200,
    body: { message: 'Healthy' },
  }
}
