import { z } from 'zod'

const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

export const TerminalValidation = z.object({
    name: z.string().min(1).max(255),
})

export type CreateTerminalDTO = z.infer<typeof TerminalValidation>
