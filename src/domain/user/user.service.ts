import { eq } from 'drizzle-orm';

import type { UserRepository } from '../../application/user.repository.ts';
import { db } from '../../infrastructure/db/drizzle.ts';
import {
    hashPassword,
    generateTemporaryPassword,
} from '../../shared/utils/crypto.ts';
import { generateStringId } from '../../shared/utils/id-generator.ts';
import type {
    CreateAdminInput,
    CreateEmployeeInput,
    UserResponse,
    UpdatePasswordInput,
} from './user.schema.ts';
import { users } from '../../infrastructure/db/schema/users.ts';

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

        const existingEmail = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (existingEmail) {
            email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}${increment}@garage-vincent-parrot.com`;
            increment++;
        }

        await db.insert(users).values({
            id,
            first_name,
            last_name,
            email,
            role,
            password: hashedPassword,
            temporary_password: true,
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

        await db.insert(users).values({
            id,
            first_name,
            last_name,
            email,
            role,
            password: hashedPassword,
            temporary_password: false,
        });
    }

    async findUserByEmail(email: string): Promise<UserResponse | null> {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user || user.length === 0) {
            return null;
        }

        return user[0] as UserResponse;
    }

    async findUserById(id: string): Promise<UserResponse | null> {
        const user = await db.select().from(users).where(eq(users.id, id));

        if (!user || user.length === 0) {
            return null;
        }

        return user[0] as UserResponse;
    }

    async updatePassword(id: string, data: UpdatePasswordInput): Promise<void> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await hashPassword(data.password);
        await db
            .update(users)
            .set({ password: hashedPassword, temporary_password: false })
            .where(eq(users.id, id));
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        await db.delete(users).where(eq(users.id, id));
    }
}
