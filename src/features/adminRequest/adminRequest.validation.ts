//This file is not used for now, its because no any data pass externally, all data comes internally through service.
//
//
import { z } from 'zod'
import {
    ADMIN_PRIORITY,
    ADMIN_STATUS,
    REQUEST_TYPE,
    TARGET_MODEL,
} from './adminRequest.constant'

const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

export const AdminRequestValidation = z.object({
    requestedBy: objectIdSchema,
    requestType: z.enum(Object.values(REQUEST_TYPE)),
    targetModel: z.enum(Object.values(TARGET_MODEL)),
    targetId: objectIdSchema,
    status: z.enum(Object.values(ADMIN_STATUS)).default(ADMIN_STATUS.PENDING),
    priority: z
        .enum(Object.values(ADMIN_PRIORITY))
        .default(ADMIN_PRIORITY.HIGH),
    notes: z.string().optional(),
})
