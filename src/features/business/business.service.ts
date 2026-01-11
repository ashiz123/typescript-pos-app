import { Types, UpdateQuery } from 'mongoose'
import { ICrudService } from '../../shared/baseService'
import { BusinessRepository, IBusinessRepository } from './business.repository'
import { BusinessProps, CreateBusinessDTO } from './business.model'
import { BusinessRequest } from '../auth/validations/BusinessSchemaValidation'

export class BusinessService implements ICrudService<BusinessProps> {
    private repo: IBusinessRepository

    constructor(repo: IBusinessRepository) {
        this.repo = repo
    }

    async getById(id: string): Promise<BusinessProps | null> {
        return this.repo.findById(id)
    }

    async getAll(): Promise<BusinessProps[]> {
        return this.repo.findAll()
    }

    async create(
        data: BusinessProps & { userId: string }
    ): Promise<BusinessProps> {
        const persistenceData: CreateBusinessDTO = {
            ...(data as BusinessRequest),
            userId: new Types.ObjectId(data.userId),
        }
        const newBusiness = await this.repo.create(persistenceData)
        return newBusiness
    }

    async update(
        id: string,
        data: UpdateQuery<BusinessProps>
    ): Promise<BusinessProps | null> {
        return this.repo.update(id, data)
    }

    async delete(id: string): Promise<boolean> {
        return this.repo.delete(id)
    }
}

export const businessService = new BusinessService(new BusinessRepository())
