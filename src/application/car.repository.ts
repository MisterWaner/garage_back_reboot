import type {
    CreateCarInput,
    UpdateCarInput,
    CarResponse,
} from '../domain/cars/cars.schema.js';

export interface CarRepository {
    createCar(data: CreateCarInput): Promise<void>;
    findAllCars(): Promise<CarResponse[]>;
    findCarByLicensePlate(license_plate: string): Promise<CarResponse | null>;
    updateCar(license_plate: string, data: UpdateCarInput): Promise<void>;
    deleteCar(license_plate: string): Promise<void>;
}