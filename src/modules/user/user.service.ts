import { User } from './user.entity.ts';
import { UserRepository } from './user.repository.ts';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async updateUser(id: string, user: Partial<User>): Promise<User> {
        return this.userRepository.update(id, user);
    }

    async deleteUser(id: string): Promise<void> {
        return this.userRepository.delete(id);
    }
}
