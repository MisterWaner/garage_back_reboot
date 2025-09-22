import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: varchar('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    role: varchar('role', { length: 50 }).notNull(),
});
