import {pgTable, serial, varchar, integer} from 'drizzle-orm/pg-core';

export const carReferences = pgTable('car_references', {
    id: serial('id').primaryKey(),
    brand: varchar('brand', { length: 100 }).notNull(),
    model: varchar('model', { length: 100 }).notNull(),
    year: integer('year').notNull(),
    counter: integer('counter').notNull().default(0)
})