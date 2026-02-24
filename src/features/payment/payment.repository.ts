import { injectable } from 'tsyringe'
import { IPaymentDocument, PaymentModel, PaymentType } from './payment.model'
import { IPaymentRepository } from './payment.types'
import { ClientSession } from 'mongoose'

@injectable()
export class PaymentRepository implements IPaymentRepository {
    private model: typeof PaymentModel

    constructor() {
        this.model = PaymentModel
    }

    async create(
        data: PaymentType,
        session: ClientSession
    ): Promise<IPaymentDocument> {
        const [payment] = await this.model.create([data], { session })
        return payment
    }
}
