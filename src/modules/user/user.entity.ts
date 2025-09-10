export enum Role {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
}

export class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public role: Role,
        public email: string,
        public password: string
    ) {}

    getId(): string {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getRole(): Role {
        return this.role;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }
}
