import { inject, injectable } from 'tsyringe'
import { IAdminRequestRepository } from './adminRequest.type'
import {
    AdminRequestDocument,
    AdminRequestModel,
    CreateAdminRequestType,
} from './adminRequest.model'
import { TOKENS } from '../../config/tokens'

@injectable()
export class AdminRequestRepository implements IAdminRequestRepository {
    constructor(
        @inject(TOKENS.ADMIN_REQUEST_MODEL)
        private readonly model: typeof AdminRequestModel
    ) {}

    async create(data: CreateAdminRequestType): Promise<AdminRequestDocument> {
        return this.model.create(data)
    }
}
