import { z } from 'zod'

export const LoginSchemaValidation = z
    .object({
        email: z.email().toLowerCase(),
        password: z.string().min(8).max(128),
    })
    .strict()
