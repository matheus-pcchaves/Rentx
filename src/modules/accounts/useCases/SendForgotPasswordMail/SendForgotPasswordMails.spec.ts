import { UsersRepositoryInMemory } from "@modules/accounts/repositories/In-Memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/In-Memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/In-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        mailProvider = new MailProviderInMemory()

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })

    it("Should be able to send forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "aedbew@ospa.com",
            name: "Blanche Curry",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("aedbew@ospa.com")

        expect(sendMail).toHaveBeenCalled()
    })

    it("Should not be able to send an email if user does not exists", async() => {
        await expect(
            sendForgotPasswordMailUseCase.execute("ka@uj.gr")
        ).rejects.toEqual(new AppError('User does not exists'))
    })

    it("Should be able to create an users token", async () => {
        const generateTokenEmail = spyOn(usersTokensRepositoryInMemory, "create")
        usersRepositoryInMemory.create({
            driver_license: "787330",
            email: "abone@ospa.com",
            name: "Leon Curry",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("abone@ospa.com")

        expect(generateTokenEmail).toBeCalled()
    })
})