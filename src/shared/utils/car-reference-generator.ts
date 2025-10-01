import { eq, and, sql } from 'drizzle-orm';
import { db } from '../../infrastructure/db/drizzle.js';
import { carReferences } from '../../infrastructure/db/schema/car-reference.js';

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
    tx: typeof db,
    brand: string,
    model: string
): Promise<string> {
    const actual_year = new Date().getFullYear();
    const brand_part = brand.replace(/\s+/g, '-').toUpperCase();
    const model_part = model.replace(/\s+/g, '-').toUpperCase();

    const keyWhere = and(
        eq(carReferences.brand, brand_part),
        eq(carReferences.model, model_part),
        eq(carReferences.year, actual_year)
    );

    const updated = await tx
        .update(carReferences)
        .set({ counter: sql`${carReferences.counter} + 1` })
        .where(keyWhere)
        .returning();

    let counter: number | undefined;

    if (updated.length > 0) {
        counter = updated[0]?.counter
    } else {
        const inserted = await tx.insert(carReferences).values({
            brand: brand_part,
            model: model_part,
            year: actual_year,
            counter: 1
        }).returning();
        counter = inserted[0]?.counter;
    }

    return `${brand_part}-${model_part}-${actual_year}-${String(counter).padStart(3, '0')}`;
}
