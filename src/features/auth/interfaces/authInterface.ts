import { HydratedDocument } from 'mongoose'
import { LoginResponseType } from '../types/LoginResponseType.type.js'

export interface IUserProps {
    _id: string
    name: string
    email: string
    phone: string
    password: string
    role?: 'user' | 'admin'
    createdAt: Date
    updatedAt: Date
}

export type IUser = HydratedDocument<IUserProps>

export interface IAuthService {
    register(
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<IUser>
    login(email: string, password: string): Promise<LoginResponseType>
    logout(token: string): Promise<boolean>
}

export interface IAuthRepository {
    createUser(
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<IUser>
    // findById(id: string): Promise<IUser | null>;

    findByEmail(email: string): Promise<IUser | null>
}

export type Payload = {
    sub: string
    email: string
}

export interface JwtPayload {
    sub: string // user id
    email: string
    role: 'user' | 'admin'
    iat: number
    exp: number
    iss: string
    aud: string
}
