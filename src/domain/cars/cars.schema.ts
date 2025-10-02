import { z } from 'zod';
import { userResponseSchema } from '../user/user.schema.js';

export const createCarSchema = z.object({
    licence_plate: z
        .string()
        .min(1)
        .max(20)
        .regex(
            /^[A-HJ-NP-TV-Z]{2}[\s-]{0,1}[0-9]{3}[\s-]{0,1}[A-HJ-NP-TV-Z]{2}$/i
        ) // French license plate format
        .trim()
        .toUpperCase(),
    brand: z.string().min(1).max(100),
    model: z.string().min(1).max(100),
    year: z
        .number()
        .int()
        .min(1886)
        .max(new Date().getFullYear() + 1),
    mileage: z.number().int().min(0),
    price: z.number().int().min(0),
    color: z.string().min(1).max(50),
    transmission: z.string().min(1).max(50),
    fuel_type: z.string().min(1).max(50),
    description: z.string().min(1),
    images: z.array(z.url()).min(1),
    status: z.enum(['available', 'sold', 'reserved']),
    added_by: userResponseSchema.shape.user_id,
});

const carResponseSchema = z.object({
    licence_plate: z
        .string()
        .min(1)
        .max(20)
        .regex(
            /^[A-HJ-NP-TV-Z]{2}[\s-]{0,1}[0-9]{3}[\s-]{0,1}[A-HJ-NP-TV-Z]{2}$/i
        ) // French license plate format
        .trim()
        .toUpperCase(),
    reference: z.string().min(1).max(100),
    brand: z.string().min(1).max(100),
    model: z.string().min(1).max(100),
    year: z
        .number()
        .int()
        .min(1886)
        .max(new Date().getFullYear() + 1),
    mileage: z.number().int().min(0),
    price: z.number().int().min(0),
    color: z.string().min(1).max(50),
    transmission: z.string().min(1).max(50),
    fuel_type: z.string().min(1).max(50),
    description: z.string().min(1),
    images: z.array(z.url()).min(1),
    status: z.enum(['available', 'sold', 'reserved']),
    added_by: userResponseSchema.shape.user_id,
});

const updateCarSchema = z.object({
    reference: z.string().min(1).max(100),
    brand: z.string().min(1).max(100),
    model: z.string().min(1).max(100),
    year: z
        .number()
        .int()
        .min(1886)
        .max(new Date().getFullYear() + 1),
    mileage: z.number().int().min(0),
    price: z.number().int().min(0),
    color: z.string().min(1).max(50),
    transmission: z.string().min(1).max(50),
    fuel_type: z.string().min(1).max(50),
    description: z.string().min(1),
    images: z.array(z.url()).min(1),
    status: z.enum(['available', 'sold', 'reserved']),
});

export type CreateCarInput = z.infer<typeof createCarSchema>;
export type CarResponse = z.infer<typeof carResponseSchema>;
export type UpdateCarInput = z.infer<typeof updateCarSchema>;