import { injectable } from 'tsyringe'
import { IOrderRepository } from './order.type'
import { OrderDocument, OrderModel, OrderType } from './order.model'
import { CreateOrderItemDTO } from './orderItems/orderItem.model'

@injectable()
export class OrderRepository implements IOrderRepository {
    private order: typeof OrderModel

    constructor() {
        this.order = OrderModel
    }

    async createOrder(
        orderId: number,
        items: CreateOrderItemDTO[],
        total: number
    ): Promise<OrderType> {
        console.log('items', items)
        return this.order.create({ orderId, items, total })
    }

    async orderById(id: string): Promise<OrderDocument | null> {
        const order = await this.order.findById(id)
        return order
    }
}
