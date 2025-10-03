import type { FastifyInstance } from 'fastify';
import { CarController } from '../controllers/car.controller.js';
import { CarService } from '../../../domain/cars/cars.service.js';
import type {
    CreateCarInput,
    CarResponse,
    UpdateCarInput,
} from '../../../domain/cars/cars.schema.js';

const carService = new CarService();
const carController = new CarController(carService);

export async function carRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: CreateCarInput }>('/', carController.createCar);
    fastify.get<{ Reply: CarResponse[] }>('/', carController.getAllCars);
    fastify.get<{
        Params: { licence_plate: string };
        Reply: CarResponse | null;
    }>('/:licence_plate', carController.getCarByLicencePlate);
    fastify.put<{ Params: { licence_plate: string }; Body: UpdateCarInput }>(
        '/:licence_plate',
        carController.updateCar
    );
    fastify.delete<{ Params: { licence_plate: string } }>(
        '/:licence_plate',
        carController.deleteCar
    );
}
