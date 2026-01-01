import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from '../../errors/httpErrors.js'

import {
    IUser,
    IAuthRepository,
    IAuthService,
    Payload,
} from './interfaces/authInterface.js'
import { signIn } from '../../utils/jwtService.js'
import { type LoginResponseType } from './types/LoginResponseType.type.js'
import { logger } from '../../middlewares/logHandler.js'
import { RedisClientType } from 'redis'

export class AuthService implements IAuthService {
    private readonly authRepository: IAuthRepository
    private readonly comparePassword: (
        password: string,
        hashedPassword: string
    ) => Promise<boolean>
    private redis: RedisClientType

    constructor(authRepository: IAuthRepository, comparePassword, redisClient) {
        this.authRepository = authRepository
        this.comparePassword = comparePassword
        this.redis = redisClient
    }

    async register(
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

    async login(email: string, password: string): Promise<LoginResponseType> {
        const user: IUser | null = await this.authRepository.findByEmail(email)
        if (!user) {
            throw new NotFoundError(
                'User not registered',
                'authService.loginUser'
            )
        }

        const isValid = await this.comparePassword(password, user.password)
        if (!isValid) {
            throw new UnauthorizedError('Invalid credentials')
        }
        const payload: Payload = {
            sub: String(user._id),
            email: user.email,
        }

        const token = await signIn(payload)
        await this.redis.set(`session:${token}`, JSON.stringify(payload), {
            EX: 3600,
        })
        logger.info(await this.redis.get(`session:${token}`))
        return {
            id: user._id,
            email: user.email,
            token: token,
        }
    }

    async logout(token: string): Promise<boolean> {
        await this.redis.del(`session:${token}`)
        return true
    }
}
