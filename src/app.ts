import fastify, { type FastifyRequest, type FastifyReply } from 'fastify';

const fastifyApp = fastify({
    logger: true,
});

fastifyApp.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send('API démarrée et opérationnelle');
})

export default fastifyApp;