export enum Role {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
}

export class User {
    private readonly id: string;
    private firstName: string;
    private lastName: string;
    private role: Role;
    private email: string;
    private password: string;

    constructor(id: string, firstName: string, lastName: string, role: Role, email: string, password: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.password = password;
    }

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