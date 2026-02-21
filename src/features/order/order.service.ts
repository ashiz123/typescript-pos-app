import { inject, injectable } from 'tsyringe'
import { IOrderRepository, IOrderService } from './order.type'
import { OrderType } from './order.model'
import { TOKENS } from '../../config/tokens'

import { ICounterRepository } from '../counter/counter.repository'
import { CreateOrderItemDTO } from './orderItems/orderItem.model'
import { IOrderItemRepository } from './orderItems/orderItem.type'
import { IProductRepository } from '../products/product.type'
import { NotFoundError } from '../../errors/httpErrors'

@injectable()
export class OrderService implements IOrderService {
    constructor(
        @inject(TOKENS.ORDER_REPOSITORY)
        private orderRepository: IOrderRepository,

        @inject(TOKENS.COUNTER_REPOSITORY)
        private counterRepository: ICounterRepository,

        @inject(TOKENS.ORDER_ITEM_REPOSITORY)
        private orderItemRepository: IOrderItemRepository,

        @inject(TOKENS.PRODUCT_REPOSITORY)
        private productRepository: IProductRepository
    ) {}

    async createOrder(items: CreateOrderItemDTO[]): Promise<OrderType> {
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
