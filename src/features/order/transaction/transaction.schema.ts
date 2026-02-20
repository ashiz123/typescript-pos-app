import { Schema } from 'mongoose'
import { TransactionDocument } from './transaction.model'

export const TransactionSchema = new Schema<TransactionDocument>(
    {
        customer_id: String,
        total_amount: { type: Number, required: true },
        currency: { type: String, required: true },
        status: {
            type: String,
            enum: ['success', 'refunded', 'cancelled'],
            required: true,
        },
        terminal_id: { type: String, required: true, default: 'terminal_1' },
        order_success_date: { type: Date, required: false, nullable: true },
    },
    {
        timestamps: true,
    }
)
