import { Document, HydratedDocument, Types } from 'mongoose'
import { LoginResponseType } from '../types/LoginResponseType.type.js'

export interface IUserProps {
    name: string
    email: string
    phone: string
    password: string
    role?: 'admin' | 'team-leader' | 'cashier' | 'manager' | 'employee'
    businessId?: Types.ObjectId
}

export type IUser = HydratedDocument<IUserProps>

export interface IUserDocument extends IUserProps, Document {
    _id: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

// export type CreateEmployee
// export type registerUser
// export type loginUser

export interface IAuthService {
    register(data: IUserProps): Promise<IUserDocument>
    login(email: string, password: string): Promise<LoginResponseType>
    logout(token: string): Promise<boolean>
}

export interface IAuthRepository {
    createUser(data: IUserProps): Promise<IUserDocument>
    // findById(id: string): Promise<IUser | null>;

    findByEmail(email: string): Promise<IUserDocument | null>
}

export type Payload = {
    sub: string
    email: string
    role: string | undefined
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
