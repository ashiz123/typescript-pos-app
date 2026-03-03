import { inject } from 'tsyringe'
import {
    AdminRequestDocument,
    AdminRequestType,
    CreateAdminRequestType,
} from './adminRequest.model'
import {
    IAdminRequestRepository,
    IAdminRequestService,
} from './adminRequest.type'
import { TOKENS } from '../../config/tokens'
import {
    ADMIN_PRIORITY,
    ADMIN_STATUS,
    REQUEST_TYPE,
    TARGET_MODEL,
} from './adminRequest.constant'
import { ClientSession } from 'mongoose'

export class AdminRequestService implements IAdminRequestService {
    constructor(
        @inject(TOKENS.ADMIN_REQUEST_REPOSITORY)
        private readonly repository: IAdminRequestRepository
    ) {}

    async createWithSession(
        data: CreateAdminRequestType,
        client: ClientSession
    ): Promise<AdminRequestDocument> {
        const fullData: AdminRequestType = {
            ...data,
            requestType: REQUEST_TYPE.ACCEPT_BUSINESS,
            targetModel: TARGET_MODEL.TERMINAL,
            status: ADMIN_STATUS.PENDING,
            priority: ADMIN_PRIORITY.URGENT,
        }
        return this.repository.createWithSession(fullData, client)
    }
}
