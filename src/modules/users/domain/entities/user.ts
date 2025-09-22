export enum UserRole {
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE"
}

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public passwordHash: string,
        public role: UserRole,
        public temporaryPassword: boolean
    ) {}
}
