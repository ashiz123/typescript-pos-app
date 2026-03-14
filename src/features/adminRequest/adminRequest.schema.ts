import mongoose from 'mongoose'
import {
    ADMIN_PRIORITY,
    ADMIN_STATUS,
    REQUEST_TYPE,
    TARGET_MODEL,
} from './adminRequest.constant'
import { AdminRequestDocument } from './adminRequest.model'

export const AdminRequestSchema = new mongoose.Schema<AdminRequestDocument>(
    {
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        requestType: {
            type: String,
            enum: Object.values(REQUEST_TYPE),
            required: true,
            index: true,
        },

        targetModel: {
            type: String,
            enum: Object.values(TARGET_MODEL),
            required: true,
            index: true,
        },

        targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
        status: {
            type: String,
            enum: Object.values(ADMIN_STATUS),
            default: ADMIN_STATUS.PENDING,
            index: true,
        },
        priority: {
            type: String,
            enum: Object.values(ADMIN_PRIORITY),
            default: ADMIN_PRIORITY.HIGH,
        },
        note: { type: String, required: false }, // Reason for the request or rejection
    },
    { timestamps: true }
)
