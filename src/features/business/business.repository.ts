import { ICrudRepository, CrudRepository } from '../../shared/crudRepository'
import { CreateBusinessDTO, UpdateBusinessDTO } from './business.model'
import { BusinessModel, IBusinessDocument } from './database/business_db_model'

//interface
export interface IBusinessRepository extends ICrudRepository<
    IBusinessDocument,
    CreateBusinessDTO,
    UpdateBusinessDTO
> {
    filterByUserId(userId: string): Promise<IBusinessDocument[]>
    filterByName(name: string): Promise<IBusinessDocument | null>
}

//class
export class BusinessRepository
    extends CrudRepository<
        IBusinessDocument,
        CreateBusinessDTO,
        UpdateBusinessDTO
    >
    implements IBusinessRepository
{
    constructor() {
        super(BusinessModel)
    }

    async filterByUserId(userId: string): Promise<IBusinessDocument[]> {
        return this.model.find({ userId })
    }

    async filterByName(name: string): Promise<IBusinessDocument | null> {
        return this.model.findOne({ name: { $regex: name, $options: 'i' } })
    }
}
