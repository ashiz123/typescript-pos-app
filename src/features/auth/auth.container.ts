import { container } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { IAuthRepository, IAuthService } from './interfaces/authInterface'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'

container.registerSingleton<IAuthRepository>(
    TOKENS.AUTH_REPOSITORY,
    AuthRepository
)
container.registerSingleton<IAuthService>(TOKENS.AUTH_SERVICE, AuthService)
