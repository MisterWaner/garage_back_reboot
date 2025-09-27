import type { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../../../domain/user/user.service.ts';
import type { CreateEmployeeInput } from '../../../domain/user/user.schema.ts';

export class UserController {
    constructor(private userService: UserService) {}

    async createEmployee(
        request: FastifyRequest<{
            Body: {
                first_name: CreateEmployeeInput['first_name'];
                last_name: CreateEmployeeInput['last_name'];
                role: CreateEmployeeInput['role'];
            };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { first_name, last_name, role } = request.body;

            if (!first_name || !last_name || !role) {
                reply
                    .status(400)
                    .send({ message: 'Les champs ne sont pas tous remplis' });
                return;
            }

            await this.userService.createEmployee({
                first_name,
                last_name,
                role,
            });
            reply.status(201).send({ message: 'Employé créé avec succès' });
        } catch (error) {
            reply
                .status(500)
                .send({ message: "Erreur lors de la création de l'employé" });
        }
    }
}
