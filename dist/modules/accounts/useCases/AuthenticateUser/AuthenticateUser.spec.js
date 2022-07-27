"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/In-Memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/In-Memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../CreateUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@tes.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    console.log(result);
    expect(result).toHaveProperty("token");
  });
  it("Should not be able to authenticate a nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
  it("Should not be able to authenticate a nonexistent user", async () => {
    const user = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "user test error"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrect password"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
});