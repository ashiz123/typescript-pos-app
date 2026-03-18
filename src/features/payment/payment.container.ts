import { container } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { IPaymentRepository, IPaymentService } from './payment.types'
import { PaymentRepository } from './payment.repository'
import { PaymentService } from './payment.service'

container.registerSingleton<IPaymentRepository>(
    TOKENS.PAYMENT_REPOSITORY,
    PaymentRepository
)
container.registerSingleton<IPaymentService>(
    TOKENS.PAYMENT_SERVICE,
    PaymentService
)
