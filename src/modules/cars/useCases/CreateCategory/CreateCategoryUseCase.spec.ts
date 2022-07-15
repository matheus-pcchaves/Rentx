import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/In-memory/CategoriesRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"

import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create category", () => {

    beforeEach(() =>{
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        console.log(categoryCreated)

        expect(categoryCreated).toHaveProperty("id")
    })

    it("Should not be able to create a new category with name exists", async () => {
        
        const category = {
            name: "Category test",
            description: "Category description test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        })

        await expect(createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
        ).rejects.toEqual(new AppError("Category already exists"))
    })
})