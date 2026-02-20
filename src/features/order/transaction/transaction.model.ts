import mongoose, { Document, Types } from 'mongoose'
import { TransactionSchema } from './transaction.schema'

export interface TransactionType {
    customer_id: Types.ObjectId
    total_amount: number
    currency: string
    status: 'success' | 'refunded' | 'cancelled'
    terminal_id: string
    order_success_date?: Date
}

// export type createTransactionType = Omit<
//     TransactionType,
//     '_id' | 'created_at' | 'updated_at'
// >

export interface TransactionDocument extends TransactionType, Document {
    createdAt: Date
    updatedAt: Date
}

export const TransactionModel = mongoose.model<TransactionDocument>(
    'Transaction',
    TransactionSchema
)
