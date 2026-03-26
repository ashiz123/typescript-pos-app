import Stripe from 'stripe'
import { ChargePaymentDTO } from './stripePayment.type'

export class StripeMapper {
    static toChargePaymentDTO(charge: Stripe.Charge): ChargePaymentDTO {
        return {
            orderId: charge.metadata.orderId,
            businessId: charge.metadata.businessId,
            amount: charge.amount,
            currency: charge.currency,
            type: charge.payment_method_details?.type ?? 'card_present',

            card_brand: charge.payment_method_details?.card_present
                ?.brand as string,

            last4:
                (charge.payment_method_details?.card_present
                    ?.last4 as string) ||
                (charge.payment_method_details?.card?.last4 as string),

            stripePaymentId:
                (typeof charge.payment_intent === 'string'
                    ? charge.payment_intent
                    : charge.payment_intent?.id) ?? '',

            receiptUrl:
                (typeof charge.receipt_url === 'string'
                    ? charge.receipt_url
                    : charge.receipt_url) ?? '',
            status: charge.status,
        }
    }
}
