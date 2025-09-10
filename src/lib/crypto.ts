import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { config } from 'dotenv';

config();

export function generateTemporaryPassword(length: number = 20): string {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

export async function hashPassword(password: string): Promise<string> {
    const salt: number = Number(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
