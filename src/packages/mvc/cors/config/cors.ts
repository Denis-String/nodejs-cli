
import Cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export const cors = (app: FastifyInstance) => {
  const corsConfig = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };

  app.register(Cors, corsConfig);
};
