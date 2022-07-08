import {  Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin"

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController

specificationRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationRoutes }