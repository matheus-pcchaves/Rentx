import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { UserMap } from "../Mapper/UserMap";

@injectable()
class ProfileUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(id: string): Promise<IUserResponseDTO>{
        const user = await this.usersRepository.findById(id)

        return UserMap.toDTO(user)
    }
}

export { ProfileUserUseCase }