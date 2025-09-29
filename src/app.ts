import fastify, { type FastifyRequest, type FastifyReply } from 'fastify';

/** Routes import */
import { routes } from './infrastructure/http/routes/index.routes.js';

const fastifyApp = fastify({
    logger: true,
});

fastifyApp.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send('API démarrée et opérationnelle');
});

fastifyApp.register(routes);

export default fastifyApp;
