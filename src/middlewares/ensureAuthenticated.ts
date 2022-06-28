import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad{
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("Token missing")
    }

    const [, token] = authHeader.split(" ")
    
    try {
        const { sub: user_id } = verify(token, "1f2e4d3b6f0b8fab1475174f8ffc2369") as IPayLoad

        const usersRepository = new UsersRepository()
        const user = usersRepository.findById(user_id)

        if(!user){
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user_id
        }

        next()
    } catch (error) {
        throw new AppError("Invalid token", 401)
    }
}