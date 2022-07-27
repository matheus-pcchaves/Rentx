"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }) {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailable(brand, category_id, name) {
    const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("brand = :brand", {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere("name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id) {
    const car = this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;