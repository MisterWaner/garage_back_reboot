import { pgTable, pgEnum, integer, serial, varchar, text } from 'drizzle-orm/pg-core';

export const reviewStatusEnum = pgEnum('review_status', ['pending', 'approved', 'rejected']);

export const reviews = pgTable('reviews', {
    id: serial('id').primaryKey(),
    rating: integer('rating').notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    comment: text('comment').notNull(),
    status: reviewStatusEnum(),
});
