"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findOpenRentalByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: (0, _typeorm.IsNull)()
      }
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id) {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: (0, _typeorm.IsNull)()
      }
    });
    return openByUser;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total
  }) {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  async findById(id) {
    const rental = this.repository.findOne({
      id
    });
    return rental;
  }

  async findByUser(user_id) {
    const rentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentals;
  }

}

exports.RentalsRepository = RentalsRepository;