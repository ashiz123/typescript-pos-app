import { inject, injectable } from 'tsyringe'
import { IOrderRepository, IOrderService } from './order.type'
import { OrderType } from './order.model'
import { TOKENS } from '../../config/tokens'
import { ICounterRepository } from '../counter/counter.repository'
import { OrderItemType } from './orderItems/orderItem.model'
import { IInventoryBatchRepository } from '../inventory/inventoryBatch.type'
import { PaymentInputType } from '../payment/payment.validation'
import { IPaymentService } from '../payment/payment.types'
import mongoose from 'mongoose'

@injectable()
export class OrderService implements IOrderService {
    constructor(
        @inject(TOKENS.ORDER_REPOSITORY)
        private orderRepository: IOrderRepository,

        @inject(TOKENS.COUNTER_REPOSITORY)
        private counterRepository: ICounterRepository,

        @inject(TOKENS.INVENTORY_BATCH_REPOSITORY)
        private inventoryRepository: IInventoryBatchRepository,

        @inject(TOKENS.PAYMENT_SERVICE)
        private paymentService: IPaymentService
    ) {}

    async createOrder(items: OrderItemType[]): Promise<OrderType> {
        const orderId = await this.counterRepository.getNextSequence('order')

        const total = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )

        const newOrder = await this.orderRepository.createOrder(
            orderId,
            items,
            total
        )

        // const order = //await this.repository.createOrder()
        return newOrder
    }

    async completeOrder(data: PaymentInputType): Promise<OrderType> {
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const updateOrder = await this.orderRepository.completeOrder(
                data.orderId,
                data.amount,
                session
            )

            if (!updateOrder) throw new Error('Order not success')
            const toUpdateItems = updateOrder.items

            await Promise.all(
                toUpdateItems.map((item) =>
                    this.inventoryRepository.decreaseTotalQuantity(
                        item.productId,
                        item.batchId,
                        item.quantity,
                        session
                    )
                )
            )

            await this.paymentService.createPayment(data, session)

            await session.commitTransaction()

            return updateOrder
        } catch (error) {
            console.log(error)
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    }

    async getOrder(orderId: string): Promise<void> {
        return
    }

    async updateOrderStatus(orderId: string, status: string): Promise<void> {
        return
    }

    async refundOrder(orderId: string): Promise<void> {
        return
    }

    async cancelOrder(orderId: string): Promise<void> {
        return
    }
}
