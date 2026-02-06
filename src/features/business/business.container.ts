import { container } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { BusinessRepository } from './business.repository'
import { BusinessService } from './business.service'
import { BusinessController } from './business.controller'
import { BusinessProps } from './business.model'
import {
    IBusinessRepository,
    IBusinessService,
    IBusinessController,
} from './business.type'

container.registerSingleton<IBusinessRepository>(
    TOKENS.BUSINESS_REPOSITORY,
    BusinessRepository
)

container.registerSingleton<IBusinessService<BusinessProps>>(
    TOKENS.BUSINESS_SERVICE,
    BusinessService
)

container.registerSingleton<IBusinessController>(
    TOKENS.BUSINESS_CONTROLLER,
    BusinessController
)
