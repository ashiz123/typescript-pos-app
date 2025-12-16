import { type LoginResponseType } from '../types/LoginResponseType.type.js'
import { IUser } from './IUserProps.interface.js'

export interface IAuthService {
    registerUser(
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<IUser>
    loginUser(email: string, password: string): Promise<LoginResponseType>
    logoutUser(token: string): Promise<boolean>
}
