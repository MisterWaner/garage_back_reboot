import { User } from '../user/user.entity.ts';

export enum CarStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    RESERVED = 'reserved',
}

export enum FuelType {
    PETROL = 'petrol',
    DIESEL = 'diesel',
    ELECTRIC = 'electric',
    HYBRID = 'hybrid',
}

export enum Transmission {
    MANUAL = 'manual',
    AUTOMATIC = 'automatic',
}

export class Car {
    private readonly id: string;
    private brand: string;
    private model: string;
    private year: number;
    private mileage: number;
    private price: number;
    private color: string;
    private power: number;
    private transmission: Transmission;
    private fuelType: FuelType;
    private description: string;
    private images: string[];
    private status: CarStatus;
    private addedBy: string;

    constructor(
        immatriculation: string,
        brand: string,
        model: string,
        year: number,
        mileage: number,
        price: number,
        color: string,
        power: number,
        transmission: Transmission,
        fuelType: FuelType,
        description: string,
        images: string[],
        status: CarStatus,
        addedBy: string
    ) {
        this.id = immatriculation;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.price = price;
        this.color = color;
        this.power = power;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.description = description;
        this.images = images;
        this.status = status;
        this.addedBy = addedBy;
    }

    getId(): string {
        return this.id;
    }

    getBrand(): string {
        return this.brand;
    }

    getModel(): string {
        return this.model;
    }

    getYear(): number {
        return this.year;
    }

    getMileage(): number {
        return this.mileage;
    }

    getPrice(): number {
        return this.price;
    }

    getColor(): string {
        return this.color;
    }

    getPower(): number {
        return this.power;
    }

    getTransmission(): Transmission {
        return this.transmission;
    }

    getFuelType(): FuelType {
        return this.fuelType;
    }

    getDescription(): string {
        return this.description;
    }

    getImages(): string[] {
        return this.images;
    }

    getStatus(): CarStatus {
        return this.status;
    }

    getAddedBy(): string {
        return this.addedBy;
    }
}
