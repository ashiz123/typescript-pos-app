import { Schema } from 'mongoose'
import { OrderItemDocument } from './orderItems/orderItem.model'
import { OrderDocument } from './order.model'

const OrderItemSubSchema = new Schema<OrderItemDocument>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    batchId: {
        type: Schema.Types.ObjectId,
        ref: 'InventoryBatch',
        required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
})

export const OrderSchema = new Schema<OrderDocument>({
    orderId: String,
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending',
    },
    items: { type: [OrderItemSubSchema], required: true },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    paidAmount: {
        type: Number,
        required: false,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})
