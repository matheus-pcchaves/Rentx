import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

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
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayLoad

        request.user = {
            id: user_id
        }

        next()
    } catch (error) {
        throw new AppError("Invalid token", 401)
    }
}