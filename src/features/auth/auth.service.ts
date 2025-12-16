import bcrypt from 'bcryptjs'
import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from '../../errors/httpErrors.js'
import { IAuthRepository } from './interfaces/IAuthRepository.interface.js'
import { IAuthService } from './interfaces/IAuthService.interface.js'
import { IUser } from './interfaces/IUserProps.interface.js'
import { signIn } from '../../utils/jwtService.js'
import { type LoginResponseType } from './types/LoginResponseType.type.js'
import { comparePassword } from '../../utils/password.js'
import { tokenBlacklist } from '../../utils/tokenBlackList.js'

export class AuthService implements IAuthService {
    constructor(private readonly authRepository: IAuthRepository) {}

    async registerUser(
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<IUser> {
        const user: IUser | null = await this.authRepository.findByEmail(email)

        if (user) {
            throw new ConflictError(
                'User already exist',
                'authService.registerUser'
            )
        }

        return await this.authRepository.createUser(
            name,
            email,
            phone,
            password
        )
    }

    async loginUser(
        email: string,
        password: string
    ): Promise<LoginResponseType> {
        const user: IUser | null = await this.authRepository.findByEmail(email)
        if (!user) {
            throw new NotFoundError(
                'User not registered',
                'authService.loginUser'
            )
        }

        const isValid = await comparePassword(password, user.password)
        if (!isValid) {
            throw new UnauthorizedError('Invalid credentials')
        }
        const payload = {
            sub: String(user._id),
            email: user.email,
        }

        const token = await signIn(payload)

        return {
            success: true,
            status: 200,
            message: 'Login successful',
            data: {
                id: user._id,
                email: user.email,
                token: token,
            },
        }
    }

    async logoutUser(token: string): Promise<boolean> {
        //validation check for user existence
        if (!token) {
            throw new UnauthorizedError('Invalid token')
        }
        tokenBlacklist.add(token)
        return true
    }
}
