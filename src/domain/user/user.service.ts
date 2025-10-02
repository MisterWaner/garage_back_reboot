import { PrismaClient } from '../../infrastructure/db/generated/prisma/index.js';

import type { UserRepository } from '../../application/user.repository.js';
import {
    hashPassword,
    generateTemporaryPassword,
} from '../../shared/utils/crypto.js';
import { generateStringId } from '../../shared/utils/id-generator.js';
import type {
    CreateAdminInput,
    CreateEmployeeInput,
    UserResponse,
    UpdatePasswordInput,
} from './user.schema.js';

const prisma = new PrismaClient();

export class UserService implements UserRepository {
    async createEmployee({
        first_name,
        last_name,
        role,
    }: CreateEmployeeInput): Promise<void> {
        const id = await generateStringId();
        const password = generateTemporaryPassword();
        const hashedPassword = await hashPassword(password);
        let email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@garage-vincent-parrot.com`;
        let increment = 1;

        const existingEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (existingEmail) {
            email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}${increment}@garage-vincent-parrot.com`;
            increment++;
        }

        await prisma.user.create({
            data: {
                user_id: id,
                first_name,
                last_name,
                email,
                role,
                password: hashedPassword,
                temporary_password: true,
            },
        });
    }

    async createAdmin({
        first_name,
        last_name,
        role,
        password,
    }: CreateAdminInput): Promise<void> {
        const id = await generateStringId();
        const hashedPassword = await hashPassword(password);
        const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@garage-vincent-parrot.com`;

        await prisma.user.create({
            data: {
                user_id: id,
                first_name,
                last_name,
                email,
                role,
                password: hashedPassword,
                temporary_password: false,
            },
        });
    }

    async findAllUsers(): Promise<UserResponse[]> {
        const allUsers = await prisma.user.findMany();
        if (!allUsers) {
            return [];
        }

        return allUsers as UserResponse[];
    }

    async findAllEmployees(): Promise<UserResponse[]> {
        const employees = await prisma.user.findMany({
            where: { role: 'EMPLOYEE' },
        });

        if (!employees) {
            return [];
        }

        return employees as UserResponse[];
    }

    async findAllAdmins(): Promise<UserResponse[]> {
        const admins = await prisma.user.findMany({
            where: { role: 'ADMIN' },
        });

        if (!admins) {
            return [];
        }

        return admins as UserResponse[];
    }

    async findUserByEmail(email: string): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return null;
        }

        return user as UserResponse;
    }

    async findUserById(id: string): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: { user_id: id },
        });

        if (!user) {
            return null;
        }

        return user as UserResponse;
    }

    async updatePassword(id: string, data: UpdatePasswordInput): Promise<void> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        const { password, confirm_password } = data;

        if (!confirm_password || !password) {
            throw new Error('Both password and confirm_password are required');
        }

        if (password !== confirm_password) {
            throw new Error('Passwords do not match');
        }

        const hashedPassword = await hashPassword(password);
        await prisma.user.update({
            where: { user_id: id },
            data: { password: hashedPassword, temporary_password: false },
        });
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        await prisma.user.delete({
            where: { user_id: id },
        });
    }
}
