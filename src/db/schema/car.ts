import { pgTable,pgEnum, varchar, integer, text } from 'drizzle-orm/pg-core';
import { users } from './user.ts';

export const carStatusEnum = pgEnum('car_status', ['available', 'sold', 'reserved']);
export const fuelTypeEnum = pgEnum('fuel_type', ['petrol', 'diesel', 'electric', 'hybrid']);
export const transmissionEnum = pgEnum('transmission', ['manual', 'automatic']);

export const cars = pgTable('cars', {
    id: varchar('immatriculation').primaryKey(),
    brand: varchar('brand', { length: 100 }).notNull(),
    model: varchar('model', { length: 100 }).notNull(),
    year: integer('year').notNull(),
    mileage: integer('mileage').notNull(),
    price: integer('price').notNull(),
    color: varchar('color', { length: 50 }).notNull(),
    power: integer('power').notNull(),
    transmission: transmissionEnum(),
    fuelType: fuelTypeEnum(),
    description: text('description').notNull(),
    images: text('images').array().notNull(),
    status: carStatusEnum(),
    addedBy: varchar('added_by', { length: 255 })
        .notNull()
        .references(() => users.id),
});
