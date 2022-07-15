import { CarsRepositoryInMemory } from "@modules/cars/repositories/In-memory/CarsRepositoryInMemory"
import { SpecificationInMemory } from "@modules/cars/repositories/In-memory/SpecificationInMemory"
import { AppError } from "@shared/errors/AppError"

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationInMemory

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
    })

    it("Shoul not be able to add a new specification to a non existant car", async () => {
        const car_id = "1234"
        const specifications_id = ["5432"]

        expect(createCarSpecificationUseCase.execute({car_id, specifications_id})
        ).rejects.toEqual(new AppError("Car does not exists"))
    })

    it("Shoul be able to add a new specification to the car", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        })

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        })

        const specifications_id = [specification.id]

        const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1)
    })
})