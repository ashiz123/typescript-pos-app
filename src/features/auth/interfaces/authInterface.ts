import { Document, Types } from 'mongoose'
import { LoginResponseType } from '../types/LoginResponseType.type.js'

export interface IUserProps {
    name: string
    email: string
    phone: string
    password?: string
    role: 'admin' | 'owner' | 'accountant' | 'cashier' | 'manager' | 'employee'
    status: 'pending' | 'active' | 'disabled'
    activationToken?: string
    createdBy: string | Types.ObjectId
}

// export type IUser = HydratedDocument<IUserProps>

export interface IUserDocument extends Omit<IUserProps, 'createdBy'>, Document {
    _id: Types.ObjectId
    createdBy: Types.ObjectId
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
    status: string
}

export interface JwtPayload {
    sub: string // user id
    email: string
    status: string
    role: 'cashier' | 'admin' | 'manager' | 'employee'
    iat: number
    exp: number
    iss: string
    aud: string
}
