import { Document, model, Types } from 'mongoose'
import { InventoryBatchSchema } from './inventoryBatch.schema'

export interface InventoryBatchBase {
    batchNumber: string
    quantity: number
    price: number
    expiryDate: Date
    deletedAt?: Date
}

export interface InventoryBatchDocument extends InventoryBatchBase, Document {
    productId: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface CreateInventoryBatchDTO extends InventoryBatchBase {
    productId: string
}

export type UpdateInventoryBatchDTO = Partial<InventoryBatchBase>

export const InventoryBatchModel = model<InventoryBatchDocument>(
    'InventoryBatch',
    InventoryBatchSchema
)
