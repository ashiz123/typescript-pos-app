import { MockedFunction, vi, type Mocked } from 'vitest'
import { AuthService } from '../../src/features/auth/auth.service'
import { ComparePasswordFn } from '../../src/utils/password'
import { signIn, SignInType } from '../../src/utils/jwtService'

import {
    IAuthRepository,
    IAuthService,
    IUser,
} from '../../src/features/auth/interfaces/authInterface'
import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from '../../src/errors/httpErrors'
import bcrypt from 'bcryptjs'
import { RedisClientType } from 'redis'

// Your mock must look like this:
vi.mock('../../src/utils/jwtService', () => ({
    signIn: vi.fn(),
}))

let authService: IAuthService
let mockAuthRepository: Mocked<IAuthRepository>
let mockComparePassword: MockedFunction<ComparePasswordFn>
let mockRedisClient: Mocked<RedisClientType>

beforeEach(() => {
    vi.clearAllMocks()
    mockAuthRepository = {
        findByEmail: vi.fn(),
        createUser: vi.fn(),
    }

    mockComparePassword = vi.fn<ComparePasswordFn>().mockResolvedValue(true)
    mockRedisClient = {
        get: vi.fn(),
        set: vi.fn(),
        del: vi.fn(),
    } as unknown as Mocked<RedisClientType>

    authService = new AuthService(
        mockAuthRepository,
        mockComparePassword,
        mockRedisClient
    )
})

describe('Register service', () => {
    const newUser: Partial<IUser> = {
        _id: '1',
        name: 'Ram Doe',
        email: 'john@gmail.com',
        phone: '1234567890',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    it('should create new user successfully', async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(null)
        mockAuthRepository.createUser.mockResolvedValue(newUser as IUser)
        const result = await authService.register(
            'Test User',
            'test@example.com',
            '1234567890',
            'password123'
        )

        // Assert
        expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(
            'test@example.com'
        )
        expect(result).toEqual(newUser)
    })

    it('should throw the conflict error, user already exist', async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(newUser as IUser)
        const result = authService.register(
            'Test User',
            'test@example.com',
            '1234567890',
            'password123'
        )
        await expect(result).rejects.toBeInstanceOf(ConflictError)
        expect(mockAuthRepository.createUser).not.toHaveBeenCalled()
    })
})

describe('login service', () => {
    let loggedInUser: Partial<IUser>

    beforeEach(async () => {
        loggedInUser = {
            _id: '1',
            name: 'Ram Doe',
            email: 'john@gmail.com',
            password: await bcrypt.hash('hashedpassword', 10),
        }
    })

    it('should throw user not registered error', async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(null)
        const result = authService.login('test@gmail.com', 'password123')
        await expect(result).rejects.toThrow('User not registered')
        await expect(result).rejects.toBeInstanceOf(NotFoundError)
    })

    it('should throw unauthorized error if password does not match', async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(loggedInUser as IUser)
        mockComparePassword.mockResolvedValue(false)
        const result = authService.login('test@gmail.com', 'wrongpassword')
        await expect(result).rejects.toBeInstanceOf(UnauthorizedError)
    })

    it('should return login response and store session in Redis on success', async () => {
        // Setup
        const mockUser = {
            _id: 'user123',
            email: 'test@example.com',
            password: 'hashedPassword',
        }

        const mockSignIn: MockedFunction<SignInType> = vi.mocked(signIn)
        const mockToken = 'fake-jwt-token-created'

        mockAuthRepository.findByEmail.mockResolvedValue(mockUser as IUser) //there is user
        mockComparePassword.mockResolvedValue(true) //password matched
        mockSignIn.mockResolvedValue(mockToken) //token received
        mockRedisClient.get.mockResolvedValue('user123') //mock that you got data in redis.

        // Execute
        const result = await authService.login(
            'ashiz@example.com',
            'password123'
        )

        // Assertions
        expect(result).toEqual({
            id: 'user123',
            email: 'test@example.com',
            token: mockToken,
        })

        // Verify Redis interaction
        expect(mockRedisClient.set).toHaveBeenCalledWith(
            `session:${mockToken}`,
            'user123',
            { EX: 3600 }
        )
    })
})

// describe('logout user', async () => {
//     it('should return true', async () => {
//         const token = 'fake-token'
//         mockRedisClient.del.mockResolvedValue(1)
//         await authService.logout(token)
//         expect(result).toBe(true)
//     })
// })
