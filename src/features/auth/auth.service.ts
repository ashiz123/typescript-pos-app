import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from '../../errors/httpErrors.js'

import {
    IUserDocument,
    IAuthRepository,
    IAuthService,
    Payload,
    IUserProps,
} from './interfaces/authInterface.js'
import { signIn } from '../../utils/jwtService.js'
import {
    LoginFirstResponse,
    LoginWithSelectBusinessDTO,
    PreAuthType,
    UserBusiness,
    type LoginResponse,
} from './types/LoginResponse.type.js'
import { RedisClientType } from 'redis'
import { IUserBusinessRepository } from '../userBusiness/interfaces/userBusiness.interface.js'

export class AuthService implements IAuthService {
    private readonly authRepository: IAuthRepository
    private readonly comparePassword: (
        password: string,
        hashedPassword: string
    ) => Promise<boolean>
    private redis: RedisClientType
    private userBusinessRepository: IUserBusinessRepository

    constructor(
        authRepository: IAuthRepository,
        comparePassword,
        redisClient,
        userBusinessRepository: IUserBusinessRepository
    ) {
        this.authRepository = authRepository
        this.comparePassword = comparePassword
        this.redis = redisClient
        this.userBusinessRepository = userBusinessRepository
    }

    async register(data: IUserProps): Promise<IUserDocument> {
        const user: IUserDocument | null =
            await this.authRepository.findByEmail(data.email)

        if (user) {
            throw new ConflictError(
                'User already exist',
                'authService.registerUser'
            )
        }

        return await this.authRepository.createUser(data)
    }

    async login(email: string, password: string): Promise<LoginFirstResponse> {
        const user: IUserDocument | null =
            await this.authRepository.findByEmail(email)
        console.log(user)
        if (!user) {
            throw new NotFoundError(
                'User not registered',
                'authService.loginUser'
            )
        }

        if (!user.password) {
            throw new UnauthorizedError('User is not activated yet')
        }

        const isValid = await this.comparePassword(password, user.password)
        if (!isValid) {
            throw new UnauthorizedError('Invalid credentials')
        }

        const data = await this.userBusinessRepository.getUserBusinesses(
            user.id
        )

        // if (!data || data.length === 0) {
        //     throw new NotFoundError(
        //         'Accept you business first and try login',
        //         'authService.loginUser'
        //     )
        // }

        //MAPPING FROM DOCUMENT TYPE TO USERBUSINESS TYPE
        const businesses: UserBusiness[] = data.map((b) => ({
            businessId: b.businessId.toString(),
            role: b.role,
            userStatus: b.userStatus,
        }))

        const preAuthData: PreAuthType = {
            sub: user.id,
            email: user.email,
            type: 'preAuth',
        }

        const token = await signIn(preAuthData)

        return {
            token: token,
            businesses,
        }
    }

    async loginWithSelectBusiness(
        data: LoginWithSelectBusinessDTO
    ): Promise<LoginResponse> {
        const userBusiness = await this.userBusinessRepository.getUserBusiness(
            data.userId,
            data.businessId
        )

        if (!userBusiness) {
            throw new NotFoundError(
                'User has no businesses, You are not authorized to login',
                'authService.loginUser'
            )
        }

        const payload: Payload = {
            sub: data.userId,
            email: data.email,
            role: userBusiness.role,
            status: userBusiness.userStatus,
            businessId: data.businessId,
            type: 'access',
        }

        const token = await signIn(payload)
        await this.redis.set(`session:${token}`, JSON.stringify(payload), {
            EX: 3600,
        })

        return {
            email: data.email,
            token: token,
        }
    }

    async logout(token: string): Promise<boolean> {
        await this.redis.del(`session:${token}`)
        return true
    }
}
