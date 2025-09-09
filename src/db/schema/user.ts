import { pgTable, varchar, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'employee']);

export const users = pgTable('users', {
    id: varchar('id').primaryKey(),
    firstname: varchar('firstname', { length: 100 }).notNull(),
    lastname: varchar('lastname', { length: 100 }).notNull(),
    role: roleEnum(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
});
