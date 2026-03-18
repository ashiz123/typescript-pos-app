import z from 'zod'
import { PAYMENT_TYPE, PAYMENT_STATUS } from './payment.constants'

const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

export const PaymentValidationSchema = z.object({
    orderId: objectIdSchema,
    amount: z.coerce.number().positive('Amount must be greater than 0'),
    currency: z
        .string()
        .length(3)
        .transform((val) => val.toUpperCase()),
    type: z.enum(PAYMENT_TYPE),
    stripePaymentId: z
        .string()
        .startsWith('pi_', 'Must be valid stripe payment id'),
    status: z.enum(PAYMENT_STATUS),
})

export type PaymentInputType = z.infer<typeof PaymentValidationSchema>
