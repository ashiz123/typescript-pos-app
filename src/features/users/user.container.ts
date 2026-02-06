import { container } from 'tsyringe'
import { IUserService, IUserRepository, IUserController } from './user.type'
import { IUserBusinessRepository } from '../userBusiness/interfaces/userBusiness.interface'
import { TOKENS } from '../../config/tokens'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserBusinessRepository } from '../userBusiness/userBusiness.repository'
import { UserService } from './user.service'

container.registerSingleton<IUserService>(TOKENS.USER_SERVICE, UserService)
container.registerSingleton<IUserController>(
    TOKENS.USER_CONTROLLER,
    UserController
)
container.registerSingleton<IUserRepository>(
    TOKENS.USER_REPOSITORY,
    UserRepository
)
container.registerSingleton<IUserBusinessRepository>(
    TOKENS.USER_BUSINESS_REPOSITORY,
    UserBusinessRepository
)
