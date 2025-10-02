import type { CarRepository } from '../../application/car.repository.js';
import type {
    CreateCarInput,
    CarResponse,
    UpdateCarInput,
} from './cars.schema.js';
import {
    PrismaClient,
    Transmission,
    FuelType,
    CarStatus,
} from '../../infrastructure/db/generated/prisma/index.js';
import { generateCarReference } from '../../shared/utils/car-reference-generator.js';

const prisma = new PrismaClient();

export class CarService implements CarRepository {
    async createCar(data: CreateCarInput): Promise<void> {
        const reference = await generateCarReference(
            prisma,
            data.brand,
            data.model
        );

        await prisma.car.create({
            data: {
                ...data,
                reference,
                transmission: data.transmission as Transmission,
                fuel_type: data.fuel_type as FuelType,
                status: data.status as CarStatus,
            },
        });
    }
    async findAllCars(): Promise<CarResponse[]> {
        const cars = await prisma.car.findMany();

        if (!cars) {
            return [];
        }

        return cars.map((car) => ({
            ...car,
            transmission: String(car.transmission),
            fuel_type: String(car.fuel_type),
            status: car.status.toLowerCase() as
                | 'available'
                | 'sold'
                | 'reserved',
            description: car.description ?? '',
        }));
    }
    async findCarByLicencePlate(
        licence_plate: string
    ): Promise<CarResponse | null> {
        const car = await prisma.car.findUnique({
            where: { licence_plate },
        });

        if (!car) {
            return null;
        }

        return {
            ...car,
            transmission: String(car.transmission),
            fuel_type: String(car.fuel_type),
            status: car.status.toLowerCase() as
                | 'available'
                | 'sold'
                | 'reserved',
            description: car.description ?? '',
        };
    }
    async updateCar(
        licence_plate: string,
        data: UpdateCarInput
    ): Promise<void> {
        const car = this.findCarByLicencePlate(licence_plate);

        if (!car) {
            throw new Error('Car not found');
        }

        await prisma.car.update({
            where: { licence_plate },
            data: {
                reference: data.reference,
                brand: data.brand,
                model: data.model,
                year: data.year,
                mileage: data.mileage,
                price: data.price,
                color: data.color,
                transmission: data.transmission as Transmission,
                fuel_type: data.fuel_type as FuelType,
                status: data.status as CarStatus,
                description: data.description,
                images: data.images,
            },
        });
    }
    async deleteCar(licence_plate: string): Promise<void> {
        const car = this.findCarByLicencePlate(licence_plate);

        if (!car) {
            throw new Error('Car not found');
        }

        await prisma.car.delete({
            where: { licence_plate },
        });
    }
}
