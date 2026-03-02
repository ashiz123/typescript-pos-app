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
import { IUserBusinessRepository } from '../userBusiness/interfaces/userBusiness.interface.js'
import Redis from 'ioredis'
import { inject, injectable } from 'tsyringe'
import { TOKENS } from '../../config/tokens.js'
import { ISessionService } from '../session/session.type.js'
import { comparePassword } from '../../utils/password.js'

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(TOKENS.AUTH_REPOSITORY) private authRepository: IAuthRepository,
        @inject(TOKENS.SESSION_SERVICE) private session: ISessionService,
        @inject(TOKENS.USER_BUSINESS_REPOSITORY)
        private userBusinessRepository: IUserBusinessRepository
    ) {}

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

        const isValid = await comparePassword(password, user.password)
        if (!isValid) {
            throw new UnauthorizedError('Invalid credentials')
        }

        const data = await this.userBusinessRepository.getUserBusinesses(
            user.id
        )

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
        await this.session.createSession(token, payload)

        return {
            email: data.email,
            token: token,
        }
    }

    async logout(token: string): Promise<boolean> {
        await this.session.deleteSession(token)
        return true
    }

    // async createSession(token: string, payload: Payload) {
    //     await this.redis.set(
    //         `session:${token}`,
    //         JSON.stringify(payload),
    //         'EX',
    //         3600
    //     )
    //     return
    // }

    // async getSessionToken(token: string): Promise<Payload> {
    //     const session = await this.redis.get(`session:${token}`)
    //     if (!session) {
    //         throw new NotFoundError('Session not found')
    //     }
    //     return JSON.parse(session) as Payload
    // }
}
