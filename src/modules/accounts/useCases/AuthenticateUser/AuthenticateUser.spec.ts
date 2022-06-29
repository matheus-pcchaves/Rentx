import { AppError } from "../../../../errors/AppError"
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO"
import { UsersRepositoryInMemory } from "../../repositories/In-Memory/UsersRepositoryInMemory"
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

    it("Should not be able to authenticate a nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("Should not be able to authenticate a nonexistent user", () => {
        expect(async () => {
            const user: ICreateUsersDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name: "user test error"
            }

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect password"
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})