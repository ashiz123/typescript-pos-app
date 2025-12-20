import { createMockAuthService } from '../__mocks__/authService.mock.js'
import { registerUser } from '../../dist/features/auth/auth.controller.js'
import { jest } from '@jest/globals'

describe('registeration user test', () => {
    let mockAuthService
    let req
    let res
    let next
    beforeEach(() => {
        mockAuthService = createMockAuthService(jest)
        req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
            },
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        next = jest.fn()
    })

    it('should register user successfully', async () => {
        const handler = registerUser(mockAuthService)
        await handler(req, res, next)

        //we need to test the service doing mocking, because if service is right then controller will be right.
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            name: 'Mock User',
            email: 'mock@example.com',
            phone: '1234567890',
            password: 'password123',
        })

        // Ensure the mock register method was called with correct parameters

        expect(mockAuthService.register).toHaveBeenCalledWith(
            'Test User',
            'test@example.com',
            '1234567890',
            'password123'
        )

        // Ensure next was not called since there was no error

        expect(next).not.toHaveBeenCalled()
    })
})
