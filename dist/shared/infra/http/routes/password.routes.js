"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswordUserController = require("@modules/accounts/useCases/ResetPasswordUser/ResetPasswordUserController");

var _SendForgotPasswordMailController = require("@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);