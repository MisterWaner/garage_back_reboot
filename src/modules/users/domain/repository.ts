import { User } from "./entities/user.ts";

export interface UserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    findAll(): Promise<User[]>;
}