import mongoose, { Document, Types } from 'mongoose'
import { OrderItemSchema } from './orderItem.schema'

export interface OrderItemType {
    quantity: number
    price: number
    productId: string
    batchId: string
}

export interface OrderItemDocument
    extends Omit<OrderItemType, 'productId' | 'batchId'>, Document {
    productId: Types.ObjectId
    batchId: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export const OrderItemModel = mongoose.model<OrderItemDocument>(
    'OrderItem',
    OrderItemSchema
)
