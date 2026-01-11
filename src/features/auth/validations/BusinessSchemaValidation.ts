import { z } from 'zod'

export const BusinessSchema = z
    .object({
        name: z.string(),
        address: z.string(),
        // Optional fields
        website: z.url().optional(),
        email: z.email().optional(),
        phone: z.string().optional(),
        businessType: z.string().optional(),
    })
    .strict()

export type BusinessRequest = z.infer<typeof BusinessSchema>
