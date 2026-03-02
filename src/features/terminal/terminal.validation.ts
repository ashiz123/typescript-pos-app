import { z } from 'zod'

export const TerminalValidation = z.object({
    name: z.string().min(1).max(255),
})

export type CreateTerminalDTO = z.infer<typeof TerminalValidation>
