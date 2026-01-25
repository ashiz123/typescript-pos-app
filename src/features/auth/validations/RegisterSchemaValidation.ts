import { z } from 'zod'
const ROLES = ['admin', 'manager', 'cashier'] as const

export const RegisterSchemaValidation = z
    .object({
        name: z.string().min(2).max(80),
        email: z.email().toLowerCase(),
        phone: z.string().min(7).max(20),
        password: z.string().min(8).max(128),
        role: z.enum(ROLES).optional().default('cashier'),
    })
    .strict()
