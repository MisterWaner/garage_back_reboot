import type { CarRepository } from '../../application/car.repository.js';
import type {
    CreateCarInput,
    CarResponse,
    UpdateCarInput,
} from './cars.schema.js';
import { db } from '../../infrastructure/db/drizzle.js';
import { cars } from '../../infrastructure/db/schema/cars.js';
import { generateCarReference } from '../../shared/utils/car-reference-generator.js';

export class CarService implements CarRepository {
    async createCar(data: CreateCarInput): Promise<void> {}
    async findAllCars(): Promise<CarResponse[]> {
        throw new Error('Method not implemented.');
    }
    async findCarByLicensePlate(
        license_plate: string
    ): Promise<CarResponse | null> {
        throw new Error('Method not implemented.');
    }
    async updateCar(
        license_plate: string,
        data: UpdateCarInput
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async deleteCar(license_plate: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
