import { Schema } from 'mongoose'

export const transactionSchema = new Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    transactionId: { type: String, required: false },
    metaData: { type: String, required: false },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
})
