import { injectable } from 'tsyringe'
import { IOrderRepository } from './order.type'
import { OrderDocument, OrderModel, OrderType } from './order.model'
import { OrderItemType } from './orderItems/orderItem.model'
import { ClientSession } from 'mongoose'

@injectable()
export class OrderRepository implements IOrderRepository {
    private order: typeof OrderModel

    constructor() {
        this.order = OrderModel
    }

    async createOrder(
        orderId: number,
        items: OrderItemType[],
        total: number
    ): Promise<OrderType> {
        console.log('items', items)
        return this.order.create({ orderId, items, total })
    }

    async orderById(id: string): Promise<OrderDocument | null> {
        const order = await this.order.findById(id)
        return order
    }

    async completeOrder(
        orderId: string,
        paidAmount: number,
        session?: ClientSession
    ): Promise<OrderDocument | null> {
        const updateOrder = await this.order.findByIdAndUpdate(
            orderId,
            {
                status: 'completed',
                paidAmount,
                updatedAt: new Date(),
            },
            { new: true, session }
        )

        return updateOrder
    }
}
