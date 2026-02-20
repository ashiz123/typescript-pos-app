import mongoose, { Document, Types } from 'mongoose'
import { OrderItemSchema } from './orderItem.schema'

export interface OrderItemType {
    quantity: number
    price: number
    productId: Types.ObjectId
    batchId: Types.ObjectId
}

export interface CreateOrderItemDTO {
    quantity: number
    price: number
    productId: string
    batchId: string
}

export interface OrderItemDocument extends OrderItemType, Document {
    createdAt: Date
    updatedAt: Date
}

export const OrderItemModel = mongoose.model<OrderItemDocument>(
    'OrderItem',
    OrderItemSchema
)
