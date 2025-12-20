import { AuthService } from '../../dist/features/auth/auth.service.js'
import { mockAuthRepository } from '../__mocks__/authService.mock.js'
import { jest } from '@jest/globals'

const mockRepository = mockAuthRepository(jest)
const authService = new AuthService(mockRepository)

it('should register user successfully', async () => {
    mockAuthRepository.findByEmail.mockResolvedValue(null)
    expect(mockRepository.findByEmail).toHaveBeenCalledWith('john@example.com')
})
