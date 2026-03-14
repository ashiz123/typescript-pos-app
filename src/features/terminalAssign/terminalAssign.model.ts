import mongoose, { Document, Types } from 'mongoose'
import { TerminalAssignSchema } from './terminalAssign.schema'
import { TerminalAssignStatus } from './terminalAssign.type'

export interface TerminalAssignType {
    terminalId: string
    assignId: string
    status: TerminalAssignStatus
    assignTime: Date
}

export interface ITerminalAssignDocument
    extends Omit<TerminalAssignType, 'terminalId' | 'assignId'>, Document {
    terminalId: Types.ObjectId
    assignId: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export const TerminalAssignModel = mongoose.model<ITerminalAssignDocument>(
    'TerminalAssign',
    TerminalAssignSchema
)
