"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/In-Memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/In-Memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/In-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "aedbew@ospa.com",
      name: "Blanche Curry",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("aedbew@ospa.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("ka@uj.gr")).rejects.toEqual(new _AppError.AppError('User does not exists'));
  });
  it("Should be able to create an users token", async () => {
    const generateTokenEmail = spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "abone@ospa.com",
      name: "Leon Curry",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("abone@ospa.com");
    expect(generateTokenEmail).toBeCalled();
  });
});