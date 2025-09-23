import { User } from "../entities/user.entities.ts";
import { Email } from "../value-objects/email.ts";

export interface UserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: Email): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
}