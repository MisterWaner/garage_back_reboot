import type {
    CreateCarInput,
    UpdateCarInput,
    CarResponse,
} from '../domain/cars/cars.schema.js';

export interface CarRepository {
    createCar(data: CreateCarInput): Promise<void>;
    findAllCars(): Promise<CarResponse[]>;
    findCarByLicencePlate(licence_plate: string): Promise<CarResponse | null>;
    updateCar(licence_plate: string, data: UpdateCarInput): Promise<void>;
    deleteCar(licence_plate: string): Promise<void>;
}