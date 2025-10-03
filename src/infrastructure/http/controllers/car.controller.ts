import type { FastifyRequest, FastifyReply } from 'fastify';
import { CarService } from '../../../domain/cars/cars.service.js';
import type {
    CreateCarInput,
    CarResponse,
    UpdateCarInput,
} from '../../../domain/cars/cars.schema.js';
import {
    createCarSchema,
    updateCarSchema,
} from '../../../domain/cars/cars.schema.js';

export class CarController {
    constructor(private carService: CarService) {
        this.createCar = this.createCar.bind(this);
        this.getAllCars = this.getAllCars.bind(this);
        this.getCarByLicencePlate = this.getCarByLicencePlate.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
    }

    async createCar(
        request: FastifyRequest<{
            Body: CreateCarInput;
        }>,
        reply: FastifyReply
    ) {
        try {
            const parsedData = createCarSchema.parse(request.body);

            await this.carService.createCar(parsedData);

            reply.status(201).send({ message: 'Voiture créée avec succès' });
        } catch (error) {
            console.error(error);

            if (error instanceof Error && 'errors' in error) {
                reply
                    .status(400)
                    .send({ message: 'Données invalides', details: error });
            } else {
                reply.status(500).send({
                    message: 'Erreur lors de la création de la voiture',
                });
            }
        }
    }

    async getAllCars(request: FastifyRequest, reply: FastifyReply) {
        try {
            const cars: CarResponse[] = await this.carService.findAllCars();
            reply.status(200).send(cars);
        } catch (error) {
            console.error(error);
            reply.status(500).send({
                message: 'Erreur lors de la récupération des voitures',
            });
        }
    }

    async getCarByLicencePlate(
        request: FastifyRequest<{
            Params: { licence_plate: string };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { licence_plate } = request.params;
            const car = await this.carService.findCarByLicencePlate(
                licence_plate
            );

            if (!car) {
                reply.status(404).send({ message: 'Voiture non trouvée' });
                return;
            }

            reply.status(200).send(car);
        } catch (error) {
            console.error(error);
            reply.status(500).send({
                message: 'Erreur lors de la récupération de la voiture',
            });
        }
    }

    async updateCar(
        request: FastifyRequest<{
            Params: { licence_plate: string };
            Body: UpdateCarInput;
        }>,
        reply: FastifyReply
    ) {
        try {
            const { licence_plate } = request.params;
            const data = request.body;
            const parsedData = updateCarSchema.parse(data);

            await this.carService.updateCar(licence_plate, parsedData);
            reply
                .status(200)
                .send({ message: 'Voiture mise à jour avec succès' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({
                message: 'Erreur lors de la mise à jour de la voiture',
            });
        }
    }

    async deleteCar(
        request: FastifyRequest<{
            Params: { licence_plate: string };
        }>,
        reply: FastifyReply
    ) {
        try {
            const { licence_plate } = request.params;

            await this.carService.deleteCar(licence_plate);
            reply
                .status(200)
                .send({ message: 'Voiture supprimée avec succès' });
        } catch (error) {
            console.error(error);
            reply.status(500).send({
                message: 'Erreur lors de la suppression de la voiture',
            });
        }
    }
}
