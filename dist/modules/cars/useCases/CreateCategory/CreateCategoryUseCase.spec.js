"use strict";

var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/In-memory/CategoriesRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category description test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    console.log(categoryCreated);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("Should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category test",
      description: "Category description test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError("Category already exists"));
  });
});