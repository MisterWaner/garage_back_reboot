import type { FastifyRequest, FastifyReply } from 'fastify';
import { CarService } from '../../../domain/cars/cars.service.js';
import type {
    CreateCarInput,
    CarResponse,
    UpdateCarInput,
} from '../../../domain/cars/cars.schema.js';
import { createCarSchema } from '../../../domain/cars/cars.schema.js';

export class CarController {
    constructor(private carService: CarService) {
        this.createCar = this.createCar.bind(this);
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
                reply
                    .status(500)
                    .send({
                        message: 'Erreur lors de la création de la voiture',
                    });
            }
        }
    }
}
