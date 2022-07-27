"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _CreateUserController = require("@modules/accounts/useCases/CreateUser/CreateUserController");

var _ProfileUserController = require("@modules/accounts/useCases/ProfileUser/ProfileUserController");

var _UpdateUserAvatarController = require("@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController");

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
usersRoutes.post("/create", createUserController.handle);
usersRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);