import { container } from "tsyringe"

import "@shared/container/providers"

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepositories"
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"

import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider"
import { IStorageProvider } from "./providers/StorageProvider/IStorageProvider"
import { S3StorageProvider } from "./providers/StorageProvider/implementations/S3StorageProvider"

container.registerSingleton< ICategoriesRepository >(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton< ISpecificationsRepository >(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
)