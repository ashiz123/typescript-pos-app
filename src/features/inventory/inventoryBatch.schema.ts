import { Schema } from 'mongoose'
import { InventoryBatchDocument } from './inventory.model'

export const InventoryBatchSchema = new Schema<InventoryBatchDocument>(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        batchNumber: { type: String, required: true },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        recievedData: { type: Date, default: Date.now },
        expiryDate: { type: Date },
    },
    { timestamps: true }
)

InventoryBatchSchema.index({ productId: 1, batchNumber: 1 }, { unique: true })
InventoryBatchSchema.index({ productId: 1, expiryDate: 1, receivedDate: 1 })
