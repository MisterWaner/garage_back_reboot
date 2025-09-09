import { pgTable, varchar, integer, text } from 'drizzle-orm/pg-core';
import { users } from './user.ts';

export const cars = pgTable('cars', {
    id: varchar('immatriculation').primaryKey(),
    brand: varchar('brand', { length: 100 }).notNull(),
    model: varchar('model', { length: 100 }).notNull(),
    year: integer('year').notNull(),
    mileage: integer('mileage').notNull(),
    price: integer('price').notNull(),
    color: varchar('color', { length: 50 }).notNull(),
    power: integer('power').notNull(),
    transmission: varchar('transmission', { length: 50 }).notNull(),
    fuelType: varchar('fuel_type', { length: 50 }).notNull(),
    description: text('description').notNull(),
    images: text('images').array().notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    addedBy: varchar('added_by', { length: 255 })
        .notNull()
        .references(() => users.id),
});
