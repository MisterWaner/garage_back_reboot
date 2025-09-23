import fastify, { type FastifyRequest, type FastifyReply } from 'fastify';

/** Routes import */
import { appRoutes } from './infrastructure/http/routes/index.routes.ts';

const fastifyApp = fastify({
    logger: true,
});

fastifyApp.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send('API démarrée et opérationnelle');
});

fastifyApp.register(appRoutes);

export default fastifyApp;
