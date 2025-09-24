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
    createAdmin({
        first_name,
        last_name,
        role,
    }: CreateAdminInput): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findUserByEmail(email: string): Promise<UserResponse | null> {
        throw new Error('Method not implemented.');
    }
    findUserById(id: string): Promise<UserResponse | null> {
        throw new Error('Method not implemented.');
    }
    updatePassword(id: string, data: UpdatePasswordInput): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteUser(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
