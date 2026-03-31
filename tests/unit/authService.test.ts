import 'reflect-metadata'
import { container } from 'tsyringe'

import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { AuthService } from '../../src/features/auth/auth.service'
import { TOKENS } from '../../src/config/tokens'
import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from '../../src/errors/httpErrors'
import { ComparePasswordFn } from '../../src/utils/password'

// 1. Keep the data outside the describe
const mockUserData = { email: 'ashiz@example.com', password: 'password123' }
const existingUser = { _id: 'user_1', ...mockUserData }

describe('AuthService.register', () => {
    // 2. Define dependencies inside the describe
    let authService: AuthService
    let mockAuthRepo: any
    let mockPassword: Mock<ComparePasswordFn> //mocked as ComparePasswordFn

    beforeEach(() => {
        // 3. Mock everything that needs to run before the function runs
        container.clearInstances()

        mockAuthRepo = {
            findByEmail: vi.fn(),
            createUser: vi.fn(),
        }

        mockPassword = vi.fn() //it should assign first.

        // Inject the mock instead of the real repository
        container.registerInstance(TOKENS.AUTH_REPOSITORY, mockAuthRepo)
        container.registerInstance(TOKENS.SESSION_SERVICE, {})
        container.registerInstance(TOKENS.USER_BUSINESS_REPOSITORY, {})
        container.registerInstance(TOKENS.NOTIFICATION_EMITTER, {})
        container.registerInstance(TOKENS.AUTHCODE_REPOSITORY, {})
        container.registerInstance(TOKENS.COMPARE_PASSWORD, mockPassword)
        authService = container.resolve(AuthService)
    })

    it('should throw ConflictError if user already exists', async () => {
        mockAuthRepo.findByEmail.mockResolvedValue(existingUser)
        const call = authService.register(mockUserData as any)
        await expect(call).rejects.toThrow(ConflictError)
        expect(mockAuthRepo.createUser).not.toHaveBeenCalled()
    })

    it('should create a new user if email is free', async () => {
        mockAuthRepo.findByEmail.mockResolvedValue(null)
        mockAuthRepo.createUser.mockResolvedValue({
            ...mockUserData,
            _id: 'new_id',
        })

        const result = await authService.register(mockUserData as any)

        expect(result).toHaveProperty('_id', 'new_id')
        expect(mockAuthRepo.createUser).toHaveBeenCalledWith(mockUserData)
    })

    it('should throw user not found', async () => {
        mockAuthRepo.findByEmail.mockResolvedValue(null)
        const result = authService.login(
            mockUserData.email,
            mockUserData.password
        )
        expect(result).rejects.toThrow(NotFoundError)
    })

    it('should throw unauthorized user', async () => {
        mockPassword.mockResolvedValue(false)
        mockAuthRepo.findByEmail.mockResolvedValue(mockUserData)
        const result = authService.login(mockUserData.email, 'wrong-password')
        expect(result).rejects.toThrow(UnauthorizedError)
    })
})
