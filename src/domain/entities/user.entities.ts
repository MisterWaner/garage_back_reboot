export enum UserRole {
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE",
}

export class User {
    private readonly id: string;
    private first_name: string;
    private last_name: string;
    private role: UserRole;
    private email: string;
    private password: string;
    private temporary_password: boolean;

    constructor(
        id: string,
        first_name: string,
        last_name: string,
        role: UserRole,
        email: string,
        password: string,
        temporary_password: boolean
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role;
        this.email = email;
        this.password = password;
        this.temporary_password = temporary_password;
    }

    // --- Getters ---
    getId(): string {
        return this.id;
    }

    getFirstName(): string {
        return this.first_name;
    }

    getLastName(): string {
        return this.last_name;
    }

    getRole(): UserRole {
        return this.role;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    hasTemporaryPassword(): boolean {
        return this.temporary_password;
    }

    // --- Methods ---

    changePassword(newPassword: string, isTemporary: boolean): void {
        this.password = newPassword;
        this.temporary_password = isTemporary;
    }
}