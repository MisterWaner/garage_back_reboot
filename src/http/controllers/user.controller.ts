import type { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../../modules/users/user.service.ts';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
}
