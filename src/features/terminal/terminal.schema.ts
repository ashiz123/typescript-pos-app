import { Schema } from 'mongoose'
import { TERMINAL_PAYMENT_STATUS, TERMINAL_STATUS } from './terminal.constant'
import { TerminalDocument } from './terminal.model'

export const terminalSchema = new Schema<TerminalDocument>(
    {
        businessId: { type: Schema.Types.ObjectId, ref: 'Business' },

        name: { type: String, required: true, unique: true },

        status: {
            type: String,
            enum: TERMINAL_STATUS,
            default: 'requested',
        },

        paymentStatus: {
            type: String,
            enum: TERMINAL_PAYMENT_STATUS,
            default: 'pending',
        },

        activationCode: { type: String, default: null },
        approvedAt: { type: Date, default: null },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true }
)
