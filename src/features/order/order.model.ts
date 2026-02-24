import mongoose, { Document } from 'mongoose'
import { OrderSchema } from './order.schema'
import { OrderItemType } from './orderItems/orderItem.model'

export interface OrderType {
    orderId: string
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    items: OrderItemType[]
    total: number
    paidAmount?: number
}

export interface OrderDocument extends OrderType, Document {
    createdAt: Date
    updatedAt: Date
}

export const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema)
