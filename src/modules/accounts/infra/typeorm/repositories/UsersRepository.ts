import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }

    async create({ name, email, password, driver_license, avatar, id }: ICreateUsersDTO): Promise<void> {
        const newUser = this.repository.create({
            name,
            email,
            password,
            driver_license,
            avatar,
            id
        })

        await this.repository.save(newUser)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})
        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({id})
        return user
    }
}

export { UsersRepository }