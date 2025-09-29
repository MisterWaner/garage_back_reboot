import type { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller.js';
import { UserService } from '../../../domain/user/user.service.js';
import type {
    CreateEmployeeInput,
    CreateAdminInput,
    UserResponse,
    UpdatePasswordInput,
} from '../../../domain/user/user.schema.ts';

const userService = new UserService();
const userController = new UserController(userService);

export async function userRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: CreateEmployeeInput }>(
        '/employees',
        userController.createEmployee
    );

    fastify.post<{ Body: CreateAdminInput }>(
        '/admins',
        userController.createAdmin
    );

    fastify.get<{ Reply: UserResponse[] }>('/', userController.getAllUsers);

    fastify.get<{ Reply: UserResponse[] }>(
        '/employees',
        userController.getAllEmployees
    );

    fastify.get<{ Reply: UserResponse[] }>(
        '/admins',
        userController.getAllAdmins
    );

    fastify.get<{ Params: { id: string }; Reply: UserResponse | null }>(
        '/:id',
        userController.getUserById
    );

    fastify.get<{ Querystring: { email: string }; Reply: UserResponse | null }>(
        '/email',
        userController.getUserByEmail
    );

    fastify.put<{
        Params: { id: string };
        Body: { data: UpdatePasswordInput };
    }>('/:id/password', userController.updatePassword);

    fastify.delete<{ Params: { id: string } }>(
        '/:id',
        userController.deleteUser
    );
}
