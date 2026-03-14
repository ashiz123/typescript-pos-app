import { Schema } from 'mongoose'
import { USER_ROLE } from '../auth/user.constant'
import {
    ENTITY_TYPE,
    NOTIFICATION_PRIORITY,
    NOTIFICATION_TYPE,
} from './notification.constant'
import { INotificationDocument } from './notification.model'

export const NotificationSchema = new Schema<INotificationDocument>(
    {
        businessId: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            required: false,
        },

        requestId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // Both Admins and Owners are "Users"
        receipient: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Always points to the User collection
            required: false,
        },

        // This is still useful for quick querying without a JOIN
        receipientType: {
            type: String,
            required: true,
            enum: Object.values(USER_ROLE),
        },

        type: {
            type: String,
            required: true,
            enum: Object.values(NOTIFICATION_TYPE),
        },

        priority: {
            type: String,
            enum: Object.values(NOTIFICATION_PRIORITY),
            default: 'MEDIUM',
        },

        metaData: {
            entityId: { type: Schema.ObjectId, required: false },
            entityType: {
                type: String,
                enum: Object.values(ENTITY_TYPE),
                required: false,
            },
            actionUrl: { type: String, required: false },
            payload: { type: Schema.Types.Mixed, default: {} },
        },

        message: String,
        isRead: { type: Boolean, default: false },
        readBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                default: [],
                required: false,
            },
        ],
    },
    { timestamps: true }
)
