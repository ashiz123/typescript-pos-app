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
import { ClientSession, Types } from 'mongoose'

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

    async decreaseTotalQuantity(
        productId: string,
        batchId: string,
        qty: number,
        session?: ClientSession
    ): Promise<void> {
        console.log(productId, batchId)
        const result = await this.model.updateOne(
            {
                productId: new Types.ObjectId(productId),
                _id: new Types.ObjectId(batchId),
                deletedAt: { $eq: null },
                quantity: { $gte: qty },
            },
            { $inc: { quantity: -qty } },
            { session }
        )
        console.log(
            `Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`
        )

        if (result.modifiedCount === 0) {
            throw new Error(
                `Insufficient stock for product ${productId} and batch ${batchId} `
            )
        }
    }
}
