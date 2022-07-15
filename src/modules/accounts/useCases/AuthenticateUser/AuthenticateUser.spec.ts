import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/In-Memory/UsersRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        )
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("Should be able to authenticate an user", async () => {

        const user: ICreateUsersDTO = {
            driver_license: "000123",
            email: "user@tes.com",
            password: "1234",
            name: "User Test"
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        console.log(result)

        expect(result).toHaveProperty("token")
    })

    it("Should not be able to authenticate a nonexistent user", async () => {
        await expect(authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })

    it("Should not be able to authenticate a nonexistent user", async () => {
        const user: ICreateUsersDTO = {
            driver_license: "9999",
            email: "user@user.com",
            password: "1234",
            name: "user test error"
        }

        await createUserUseCase.execute(user)

        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect password"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })
})