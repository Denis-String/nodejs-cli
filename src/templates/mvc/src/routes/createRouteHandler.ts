import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpHeader } from 'fastify/types/utils';

export type Handler = (request: FastifyRequest) => Promise<{
  statusCode: number,
  body?: object,
  headers?: Partial<Record<HttpHeader, number | string | string[] | undefined>>
}>

const createRouteHandler = (handler: Handler) => async (request: FastifyRequest, response: FastifyReply) => {
  const result = await handler(request);

  if (result.headers) response.headers(result.headers);

  response.code(result.statusCode).send(result.body);
};


export default createRouteHandler;
