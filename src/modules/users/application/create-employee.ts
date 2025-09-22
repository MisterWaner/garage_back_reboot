import type { UserRepository } from "../domain/repository.ts";
import { User, UserRole } from "../domain/entities/user.ts";
import { Email } from "../domain/value-objects/email.ts";
import { generateTemporaryPassword, hashPassword } from "../../../lib/crypto.ts";
import { generateStringId } from "../../../lib/id-generator.ts";

interface CreateEmployeeInput {
    firstName: string;
    lastName: string;
    domain: string;
}

export class CreateEmployee {
    constructor(private userRepository: UserRepository) {}

    async execute(input: CreateEmployeeInput): Promise<void> {
        const domain: CreateEmployeeInput["domain"] = "garage-vincent-parrot.com";
        const emailStr = `${input.firstName}.${input.lastName}@${domain}`.toLowerCase();
        const email = Email.create(emailStr);

        const existing = await this.userRepository.findByEmail(email.value);
        if (existing) {
            throw new Error("User with this email already exists");
        }

        const tempPassword = generateTemporaryPassword(20);
        const passwordHash = await hashPassword(tempPassword);

        const user = new User(
            await generateStringId(),
            email.value,
            passwordHash,
            UserRole.EMPLOYEE,
            true
        );

        await this.userRepository.save(user);

        // In a real application, you would send the temporary password to the user's email.
    }
}