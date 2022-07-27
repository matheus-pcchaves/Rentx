"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers");

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _UsersTokensRepository = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarsImagesRepository = require("@modules/cars/infra/typeorm/repositories/CarsImagesRepository");

var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepositories = require("@modules/cars/infra/typeorm/repositories/CategoriesRepositories");

var _SpecificationRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationRepository");

var _RentalsRepository = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");

_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepositories.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImagesRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);