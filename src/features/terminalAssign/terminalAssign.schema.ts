import { Schema } from 'mongoose'
import { TERMINAL_ASSIGN_STATUS } from './terminalAssign.constant'
import { ITerminalAssignDocument } from './terminalAssign.model'

export const TerminalAssignSchema = new Schema<ITerminalAssignDocument>(
    {
        terminalId: { type: Schema.Types.ObjectId, ref: 'Terminal' },
        assignId: { type: Schema.Types.ObjectId, ref: 'User' },
        status: {
            type: String,
            enum: Object.values(TERMINAL_ASSIGN_STATUS),
            default: TERMINAL_ASSIGN_STATUS.DISABLE,
        },
        assignTime: { type: Date, default: Date.now() },
    },
    { timestamps: true }
)
