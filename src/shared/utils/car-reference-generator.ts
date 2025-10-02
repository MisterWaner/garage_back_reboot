import { PrismaClient } from '../../infrastructure/db/generated/prisma/index.js';

const prisma: PrismaClient = new PrismaClient();

/**
 * Generates a unique car reference based on brand, model, and year.
 * The format is BRAND-MODEL-YEAR-XXX where XXX is a zero-padded incrementing number.
 * If the generated reference already exists, the incrementing number is increased until a unique reference is found.
 *
 * @param tx - The database transaction object.
 * @param brand - The brand of the car.
 * @param model - The model of the car.
 * @returns A promise that resolves to the unique car reference string.
 *
 */

export async function generateCarReference(
    tx: PrismaClient,
    brand: string,
    model: string
): Promise<string> {
    const actual_year = new Date().getFullYear();
    const brand_part = brand.replace(/\s+/g, '-').toUpperCase();
    const model_part = model.replace(/\s+/g, '-').toUpperCase();

    let ref = await tx.carReference.findFirst({
        where: {
            brand: brand_part,
            model: model_part,
            year: actual_year,
        },
    });

    let counter: number;

    if (ref) {
        ref = await tx.carReference.update({
            where: { reference_id: ref.reference_id },
            data: { counter: { increment: 1 } },
        });
        counter = ref.counter;
    } else {
        ref = await tx.carReference.create({
            data: {
                brand: brand_part,
                model: model_part,
                year: actual_year,
                counter: 1,
            },
        });
        counter = ref.counter;
    }

    return `${brand_part}-${model_part}-${actual_year}-${String(
        counter
    ).padStart(3, '0')}`;
}
