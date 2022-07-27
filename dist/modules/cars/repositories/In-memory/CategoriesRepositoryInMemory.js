"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _category = require("@modules/cars/infra/typeorm/entities/category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async list() {
    const list = this.categories;
    return list;
  }

  async create({
    name,
    description
  }) {
    const category = new _category.Category();
    Object.assign(category, {
      name,
      description
    });
    this.categories.push(category);
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;