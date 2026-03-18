import { Schema } from 'mongoose'
import { OrderItemDocument } from './orderItem.model'

export const OrderItemSchema = new Schema<OrderItemDocument>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    batchId: {
        type: Schema.Types.ObjectId,
        ref: 'InventoryBatch',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
})
