import { z } from 'zod';

const EmailSchema = z.email();

export class Email {
    private constructor(public readonly value: string) {}

    static create(value: string): Email {
        const parsed = EmailSchema.parse(value.toLowerCase());
        return new Email(parsed);
    }
}
