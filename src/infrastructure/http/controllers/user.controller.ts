import type { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../../../domain/user/user.service.js';
import type {
    CreateEmployeeInput,
    CreateAdminInput,
    UserResponse,
    UpdatePasswordInput,
} from '../../../domain/user/user.schema.js';

export class UserController {
    constructor(private userService: UserService) {
        this.createEmployee = this.createEmployee.bind(this);
        this.createAdmin = this.createAdmin.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getAllEmployees = this.getAllEmployees.bind(this);
        this.getAllAdmins = this.getAllAdmins.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

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

    async createAdmin(
        request: FastifyRequest<{
            Body: {
                first_name: CreateAdminInput['first_name'];
                last_name: CreateAdminInput['last_name'];
                role: CreateAdminInput['role'];
                password: CreateAdminInput['password'];
                confirm_password: CreateAdminInput['confirm_password'];
            };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { first_name, last_name, role, password, confirm_password } =
                request.body;

            if (
                !first_name ||
                !last_name ||
                !role ||
                !password ||
                !confirm_password
            ) {
                reply
                    .status(400)
                    .send({ message: 'Les champs ne sont pas tous remplis' });
                return;
            }

            if (password !== confirm_password) {
                reply.status(400).send({
                    message: 'Les mots de passe ne correspondent pas',
                });
                return;
            }

            await this.userService.createAdmin({
                first_name,
                last_name,
                role,
                password,
                confirm_password,
            });
            reply
                .status(201)
                .send({ message: 'Administrateur créé avec succès' });
        } catch (error) {
            reply.status(500).send({
                message: "Erreur lors de la création de l'administrateur",
            });
        }
    }

    async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        try {
            const users: UserResponse[] = await this.userService.findAllUsers();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send({
                message: 'Erreur lors de la récupération des utilisateurs',
            });
        }
    }

    async getAllEmployees(request: FastifyRequest, reply: FastifyReply) {
        try {
            const employees: UserResponse[] = await this.userService.findAllEmployees();
            reply.status(200).send(employees);
        } catch (error) {
            reply.status(500).send({
                message: 'Erreur lors de la récupération des employés',
            });
        }
    }

    async getAllAdmins(request: FastifyRequest, reply: FastifyReply) {
        try {
            const admins: UserResponse[] = await this.userService.findAllAdmins();
            reply.status(200).send(admins);
        } catch (error) {
            reply.status(500).send({
                message: 'Erreur lors de la récupération des administrateurs',
            });
        }
    }

    async getUserById(
        request: FastifyRequest<{
            Params: { id: string };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            const employee = await this.userService.findUserById(id);
            if (!employee) {
                reply.status(404).send({ message: 'Employé non trouvé' });
                return;
            }
            reply.status(200).send(employee);
        } catch (error) {
            reply.status(500).send({
                message: "Erreur lors de la récupération de l'employé",
            });
        }
    }

    async getUserByEmail(
        request: FastifyRequest<{
            Querystring: { email: string };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { email } = request.query;
            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                reply.status(404).send({ message: 'Utilisateur non trouvé' });
                return;
            }
            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send({
                message: "Erreur lors de la récupération de l'utilisateur",
            });
        }
    }

    async updatePassword(
        request: FastifyRequest<{
            Params: { id: string };
            Body: { data: UpdatePasswordInput };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            const { data } = request.body;

            if (!data.password || data.confirm_password) {
                reply
                    .status(400)
                    .send({ message: 'Les champs ne sont pas tous remplis' });
                return;
            }

            if (data.password !== data.confirm_password) {
                reply.status(400).send({
                    message: 'Les mots de passe ne correspondent pas',
                });
                return;
            }

            await this.userService.updatePassword(id, data);
            reply
                .status(200)
                .send({ message: 'Mot de passe mis à jour avec succès' });
        } catch (error) {
            reply.status(500).send({
                message: 'Erreur lors de la mise à jour du mot de passe',
            });
        }
    }

    async deleteUser(
        request: FastifyRequest<{
            Params: { id: string };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            await this.userService.deleteUser(id);
            reply
                .status(200)
                .send({ message: 'Utilisateur supprimé avec succès' });
        } catch (error) {
            reply.status(500).send({
                message: "Erreur lors de la suppression de l'utilisateur",
            });
        }
    }
}
