import { db } from '../../db/index.ts';
import { Role, User } from './user.entity.ts';
import { users } from '../../db/schema/user.ts';
import { eq } from 'drizzle-orm';

export class UserRepository {
    async create(user: User): Promise<User> {
        const [result] = await db
            .insert(users)
            .values({
                id: user.getId(),
                firstname: user.getFirstName(),
                lastname: user.getLastName(),
                role: user.getRole(),
                email: user.getEmail(),
                password: user.getPassword(),
            })
            .returning();

        if (!result) {
            throw new Error('User creation failed');
        }

        return new User(
            result.id,
            result.firstname,
            result.lastname,
            result.role as Role,
            result.email,
            result.password
        );
    }

    async findById(id: string): Promise<User | null> {
        const [result] = await db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        if (!result) {
            return null;
        }

        return new User(
            result.id,
            result.firstname,
            result.lastname,
            result.role as Role,
            result.email,
            result.password
        );
    }
    async findByEmail(email: string): Promise<User | null> {
        const [result] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if (!result) {
            return null;
        }

        return new User(
            result.id,
            result.firstname,
            result.lastname,
            result.role as Role,
            result.email,
            result.password
        );
    }
    async update(id: string, user: Partial<User>): Promise<User> {
        const [result] = await db
            .update(users)
            .set({
                firstname: user.firstName,
                lastname: user.lastName,
                role: user.role,
                email: user.email,
                password: user.password,
            })
            .where(eq(users.id, id))
            .returning();

        if (!result) {
            throw new Error('User update failed');
        }

        return new User(
            result.id,
            result.firstname,
            result.lastname,
            result.role as Role,
            result.email,
            result.password
        );
    }
    async delete(id: string): Promise<void> {
        const result = await db
            .delete(users)
            .where(eq(users.id, id))
            .returning()
            .then((res) => res[0]);

        if (!result) {
            throw new Error('User deletion failed');
        }

        return;
    }
}
