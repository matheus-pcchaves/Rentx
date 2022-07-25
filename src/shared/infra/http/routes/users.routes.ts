import { Router } from "express"
import multer from "multer"

import uploadConfig from "@config/upload"
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController"
import { ProfileUserController } from "@modules/accounts/useCases/ProfileUser/ProfileUserController"
import { UpdateUserAvatarController } from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController() 
const profileUserController = new ProfileUserController()

usersRoutes.post("/create", createUserController.handle)

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle)

usersRoutes.get("/", ensureAuthenticated, profileUserController.handle)

export { usersRoutes }