import { inject, injectable } from "tsyringe"

import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository"

interface IRequest {
    car_id: string,
    image_name: string[]
}

@injectable()
class UploadCarImagesUseCase {

    constructor(
        @inject("CarsImageRepository")
        private carsImagesRepository: ICarsImageRepository
    ){}

    async execute({car_id, image_name}: IRequest): Promise<void>{
        image_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image)
        })
    }
}

export { UploadCarImagesUseCase }