"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRoutes = void 0;

var _express = require("express");

var _CreateSpecificationController = require("@modules/cars/useCases/CreateSpecification/CreateSpecificationController");

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

const specificationRoutes = (0, _express.Router)();
exports.specificationRoutes = specificationRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
specificationRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createSpecificationController.handle);