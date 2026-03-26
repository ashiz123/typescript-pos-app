import Stripe from 'stripe'
import { stripe } from './stripeClient'
import {
    IPaymentIntentDTO,
    IStripePaymentService,
    StripePaymentData,
    StripePaymentStatus,
} from './stripePayment.type'
import { inject, injectable } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { OrderService } from '../order/order.service'
import { IOrderService } from '../order/order.type'
import { StripeMapper } from './stripe.mapper'

@injectable()
export class StripePaymentService implements IStripePaymentService {
    constructor() {}

    createPaymentIntent = async (
        stripePaymentData: StripePaymentData
    ): Promise<IPaymentIntentDTO> => {
        try {
            const intent: Stripe.PaymentIntent =
                await stripe.paymentIntents.create({
                    amount: stripePaymentData.amount,
                    currency: stripePaymentData.currency,
                    payment_method_types: ['card_present'],
                    capture_method: 'automatic',
                    metadata: {
                        orderId: stripePaymentData.orderId,
                        businessId: stripePaymentData.businessId,
                    },
                })

            return {
                id: intent.id,
                client_secret: intent.client_secret as string,
                amount: intent.amount,
                currency: intent.currency,
                status: intent.status as StripePaymentStatus,
                metadata: {
                    orderId: intent.metadata.orderId,
                    businessId: intent.metadata.businessId,
                },
            }
        } catch (err) {
            console.error('Stripe API Error:', err)
            throw new Error('Failed to initialize Stripe payment')
        }
    }

    // paymentSuccess = async (charge: Stripe.Charge): Promise<void> => {
    //     try {
    //         if (!charge.metadata.orderId) throw new Error('Missing OrderID')
    //         const dto = StripeMapper.toChargePaymentDTO(charge)
    //         await this.orderService.completeOrder(dto)
    //     } catch (error) {
    //         console.error(error)
    //         throw new Error(
    //             `Payment is successful but failed to record the payment ${error}`
    //         )
    //     }
    // }
}
