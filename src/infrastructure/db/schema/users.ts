import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: varchar('user_id').primaryKey(),
    first_name: varchar('first_name', { length: 100 }).notNull(),
    last_name: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    role: varchar('role', { enum: ['ADMIN', 'EMPLOYEE'] }).notNull(),
    temporary_password: boolean('temporary_password').notNull().default(true),
});
