import type { FastifyInstance } from 'fastify';
import { userRoutes } from './user.routes.ts';

export async function appRoutes(fastify: FastifyInstance) {
    fastify.register(userRoutes, { prefix: '/users' });
}
