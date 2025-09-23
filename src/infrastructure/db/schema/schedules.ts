import { pgTable, serial, varchar, time } from 'drizzle-orm/pg-core';
import { users } from './users.ts';

export const schedules = pgTable('schedules', {
    id: serial('id').primaryKey(),
    day: varchar('day', { length: 50 }).notNull(),
    opening_time: time('opening_time').notNull(),
    closing_time: time('closing_time').notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    added_by: varchar('added_by', { length: 255 })
        .notNull()
        .references(() => users.id),
});
