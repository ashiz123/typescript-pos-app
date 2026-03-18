import { z } from 'zod'
import { objectIdSchema } from '../../utils/objectIdSchema'

export const CreateTerminalValidation = z.object({
    name: z.string().min(1).max(255),
    note: z.string().max(400).optional(),
})

export type CreateTerminalDTO = z.infer<typeof CreateTerminalValidation>

export const ApproveTerminalValidation = z.object({
    businessId: objectIdSchema,
    terminalId: objectIdSchema,
})

export type ApproveTerminalDTO = z.infer<typeof ApproveTerminalValidation>
