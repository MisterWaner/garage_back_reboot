import { pgTable, varchar, integer, text } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const cars = pgTable('cars', {
    id: varchar('license_plate').primaryKey(),
    reference: varchar('reference', { length: 100 }).notNull(),
    brand: varchar('brand', { length: 100 }).notNull(),
    model: varchar('model', { length: 100 }).notNull(),
    year: integer('year').notNull(),
    mileage: integer('mileage').notNull(),
    price: integer('price').notNull(),
    color: varchar('color', { length: 50 }).notNull(),
    transmission: varchar('transmission', { length: 50 }).notNull(),
    fuel_type: varchar('fuel_type', { length: 50 }).notNull(),
    description: text('description').notNull(),
    images: text('images').array().notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    added_by: varchar('added_by', { length: 255 })
        .notNull()
        .references(() => users.id),
});
