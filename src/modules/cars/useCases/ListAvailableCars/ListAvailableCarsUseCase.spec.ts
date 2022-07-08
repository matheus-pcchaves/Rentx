import { CarsRepositoryInMemory } from "@modules/cars/repositories/In-memory/CarsRepositoryInMemory"

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("Shoul be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Car description",
            daily_rate: 140.00,
            license_plate: "DEF-456",
            fine_amount: 100,
            brand: "Car Brand",
            category_id: "Category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })
    it("Shoul be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Car description",
            daily_rate: 140.00,
            license_plate: "DEF-456",
            fine_amount: 100,
            brand: "Car_Brand",
            category_id: "Category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand"
        })

        expect(cars).toEqual([car])
    })
    it("Shoul be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Car description",
            daily_rate: 140.00,
            license_plate: "DEF-456",
            fine_amount: 100,
            brand: "Car_Brand_test",
            category_id: "Category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        })

        expect(cars).toEqual([car])
    })
    it("Shoul be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 140.00,
            license_plate: "DEF-4561",
            fine_amount: 100,
            brand: "Car_Brand_test",
            category_id: "Category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        })

        expect(cars).toEqual([car])
    })
    it("Shoul be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 140.00,
            license_plate: "DEF-4561",
            fine_amount: 100,
            brand: "Car_Brand_test",
            category_id: "Category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "Category_id",
        })

        expect(cars).toEqual([car])
    })
})