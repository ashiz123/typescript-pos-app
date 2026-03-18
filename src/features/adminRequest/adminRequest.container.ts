import { container } from 'tsyringe'
import { IAdminRequestRepository } from './adminRequest.type'
import { TOKENS } from '../../config/tokens'
import { AdminRequestRepository } from './adminRequest.repository'
import { AdminRequestModel } from './adminRequest.model'

container.registerInstance<typeof AdminRequestModel>(
    TOKENS.ADMIN_REQUEST_MODEL,
    AdminRequestModel
)

// container.registerSingleton<IAdminRequestRepository>(
//     TOKENS.ADMIN_REQUEST_REPOSITORY,
//     AdminRequestRepository
// )

// container.registerSingleton<IAdminRequestService>(
//     TOKENS.ADMIN_REQUEST_SERVICE,
//     AdminRequestService
// )
