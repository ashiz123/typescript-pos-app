import { AuthService } from '../../dist/features/auth/auth.service.js'
import { mockAuthRepository } from '../__mocks__/authService.mock.js'
import { jest } from '@jest/globals'

describe('AuthService.register', () => {
    let authService
    let authRepo

    beforeEach(() => {
        authRepo = mockAuthRepository(jest)

        authRepo.findByEmail.mockResolvedValue(null) // No existing user
        authRepo.createUser.mockResolvedValue({
            id: 'user123',
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
        })

        authService = new AuthService(authRepo)
    })

    it('should create a new user if email does not exist', async () => {
        const result = await authService.register(
            'Test User',
            'test@example.com',
            '1234567890',
            'password123'
        )

        expect(authRepo.findByEmail).toHaveBeenCalledWith('test@example.com')
        expect(authRepo.createUser).toHaveBeenCalledWith(
            'Test User',
            'test@example.com',
            '1234567890',
            'password123'
        )

        expect(result).toEqual({
            id: 'user123',
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
        })
    })
})
