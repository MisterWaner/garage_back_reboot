import type { FastifyInstance } from 'fastify';
import { userRouter } from './user.routes.js';
import { carRouter } from './car.routes.js';

export async function routes(fastify: FastifyInstance) {
    console.log('Registering routes...');
    fastify.register(userRouter, { prefix: '/users' });
    fastify.register(carRouter, { prefix: '/cars' });
}
