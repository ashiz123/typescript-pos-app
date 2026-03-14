import mongoose, { Document, Types } from 'mongoose'
import { TERMINAL_STATUS, TERMINAL_PAYMENT_STATUS } from './terminal.constant'
import { terminalSchema } from './terminal.schema'

export type TerminalStatus =
    (typeof TERMINAL_STATUS)[keyof typeof TERMINAL_STATUS]

export type TerminalPaymentStatus =
    (typeof TERMINAL_PAYMENT_STATUS)[keyof typeof TERMINAL_PAYMENT_STATUS]

export interface TerminalType {
    ownerId: string
    businessId: string
    name: string
    status: TerminalStatus
    paymentStatus: TerminalPaymentStatus
    activationCode: string
    approvedAt?: Date
    approvedBy?: string
}

export interface CreateTerminal extends TerminalType {
    note?: string
}

export interface ApproveTerminal {
    terminalId: string
    businessId: string
    approvedBy: string
    status: TerminalStatus
    approvedAt: Date
}

export interface TerminalDocument
    extends Omit<TerminalType, 'businessId' | 'ownerId'>, Document {
    ownerId: Types.ObjectId
    businessId: Types.ObjectId
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export interface UpdateTerminalDTO {
    name?: string
}

export const TerminalModel = mongoose.model<TerminalDocument>(
    'Terminal',
    terminalSchema
)
