import { pgTable, serial, varchar, time } from 'drizzle-orm/pg-core';
import { users } from './user.ts';

export const schedules = pgTable('schedules', {
    id: serial('id').primaryKey(),
    day: varchar('day', { length: 50 }).notNull(),
    openingTime: time('opening_time').notNull(),
    closingTime: time('closing_time').notNull(),
    addedBy: varchar('added_by', { length: 255 })
        .notNull()
        .references(() => users.id),
});