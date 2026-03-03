import { z } from 'zod'

export const TerminalValidation = z.object({
    name: z.string().min(1).max(255),
    note: z.string().max(400).optional(),
})

export type CreateTerminalDTO = z.infer<typeof TerminalValidation>
