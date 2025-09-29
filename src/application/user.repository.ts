import type {
    CreateEmployeeInput,
    CreateAdminInput,
    UserResponse,
    UpdatePasswordInput,
} from '../domain/user/user.schema.ts';

export interface UserRepository {
    createEmployee({
        first_name,
        last_name,
        role,
    }: CreateEmployeeInput): Promise<void>;
    createAdmin({
        first_name,
        last_name,
        role,
        password,
    }: CreateAdminInput): Promise<void>;
    findAllUsers(): Promise<UserResponse[]>;
    findAllEmployees(): Promise<UserResponse[]>;
    findAllAdmins(): Promise<UserResponse[]>;
    findUserByEmail(email: string): Promise<UserResponse | null>;
    findUserById(id: string): Promise<UserResponse | null>;
    updatePassword(id: string, data: UpdatePasswordInput): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
