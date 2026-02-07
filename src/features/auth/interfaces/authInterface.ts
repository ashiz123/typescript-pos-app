import { Document, Types } from 'mongoose'
import {
    LoginFirstResponse,
    LoginResponse,
    LoginWithSelectBusinessDTO,
} from '../types/LoginResponse.type.js'

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
    login(email: string, password: string): Promise<LoginFirstResponse>
    logout(token: string): Promise<boolean>
    loginWithSelectBusiness(
        data: LoginWithSelectBusinessDTO
    ): Promise<LoginResponse>
}

export interface IAuthRepository {
    createUser(data: IUserProps): Promise<IUserDocument>
    // findById(id: string): Promise<IUser | null>;

    findByEmail(email: string): Promise<IUserDocument | null>
}

export type Payload = {
    sub: string
    email: string
    role?: string
    businessId?: string
    status?: string
    type: string
}

export interface JwtPayload {
    sub: string // user id
    email: string
    status?: string
    type?: string
    businessId?: string
    role: 'cashier' | 'admin' | 'manager' | 'employee'
    iat: number
    exp: number
    iss: string
    aud: string
}
