import { IInventoryBatchRepository } from './inventoryBatch.type'
import {
    CreateInventoryBatchDTO,
    InventoryBatchBase,
    InventoryBatchDocument,
    InventoryBatchModel,
    UpdateInventoryBatchDTO,
} from './inventoryBatch.model'
import { CrudRepository } from '../../shared/crudRepository'
import { injectable } from 'tsyringe'
import { Types } from 'mongoose'

@injectable()
export class InventoryBatchRepository
    extends CrudRepository<
        InventoryBatchDocument,
        CreateInventoryBatchDTO,
        UpdateInventoryBatchDTO
    >
    implements IInventoryBatchRepository
{
    constructor() {
        super(InventoryBatchModel)
    }

    async getBatchNumberRepo(productId: string): Promise<string> {
        const stockBatch = await this.model
            .findOne({ productId: new Types.ObjectId(productId) })
            .sort({ createdAt: -1 })
            .select('batchNumber')
            .lean()
        return stockBatch ? stockBatch.batchNumber : ''
    }

    async findByProductId(productId: string): Promise<InventoryBatchBase[]> {
        return this.model
            .find({ productId: new Types.ObjectId(productId), deletedAt: null })
            .lean()
    }
}
