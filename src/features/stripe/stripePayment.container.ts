import { container } from 'tsyringe'
import { IStripePaymentService } from './stripePayment.type'
import { TOKENS } from '../../config/tokens'
import { StripePaymentService } from './stripePayment.service'

container.registerSingleton<IStripePaymentService>(
    TOKENS.STRIPE_PAYMENT_SERVICE,
    StripePaymentService
)
