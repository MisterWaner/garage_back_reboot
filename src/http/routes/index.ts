import type { FastifyInstance } from "fastify";
import { userRoutes } from "./user.router.ts";

export async function routes(fastify: FastifyInstance) {
    fastify.register(userRoutes, { prefix: "/users" });
}