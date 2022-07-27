"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationInMemory = void 0;

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

class SpecificationInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name) {
    return this.specifications.find(specification => specification.name === name);
  }

  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id));
    return allSpecifications;
  }

}

exports.SpecificationInMemory = SpecificationInMemory;