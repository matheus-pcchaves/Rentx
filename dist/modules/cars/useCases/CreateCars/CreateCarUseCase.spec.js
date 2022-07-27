"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/In-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category"
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with exist license plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category"
    });
    expect(createCarUseCase.execute({
      name: "Car 2",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category"
    })).rejects.toEqual(new _AppError.AppError("Car already exists"));
  });
  it("should be able to create a car available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description car",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category"
    });
    expect(car.available).toBe(true);
  });
});