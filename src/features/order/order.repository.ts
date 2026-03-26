import { injectable } from 'tsyringe'
import { IOrderRepository } from './order.type'
import { OrderDocument, OrderModel, OrderType } from './order.model'
import { OrderItemType } from './orderItems/orderItem.model'
import { ClientSession } from 'mongoose'
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
} from '../../errors/httpErrors'

@injectable()
export class OrderRepository implements IOrderRepository {
    private order: typeof OrderModel

    constructor() {
        this.order = OrderModel
    }

    async createOrder(
        orderId: number,
        creatorId: string,
        businessId: string,
        terminalId: string,
        terminalSessionId: string,
        items: OrderItemType[],
        total: number
    ): Promise<OrderDocument> {
        try {
            return this.order.create({
                orderId,
                creatorId,
                businessId,
                terminalId,
                terminalSessionId,
                items,
                total,
            })
        } catch (err: any) {
            throw new BadRequestError('Order cannot created', err.message)
        }
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
        try {
            const updateOrder = await this.order.findOneAndUpdate(
                { _id: orderId, status: 'pending' },
                {
                    status: 'completed',
                    paidAmount,
                    updatedAt: new Date(),
                },
                { new: true, session }
            )

            return updateOrder
        } catch (error: any) {
            console.log(error)
            throw new Error('Database error', error)
        }
    }

    async deleteOrder(orderId: string): Promise<boolean> {
        const order = await this.order.findOneAndDelete({
            _id: orderId,
            status: 'pending',
        })

        if (!order)
            throw new ConflictError(
                'Order cannot be deleted',
                'Order Repository'
            )
        return true
    }

    async cancelOrder(orderId: string): Promise<OrderType | null> {
        const order = await this.order.findOneAndUpdate(
            { _id: orderId, status: 'pending' },
            { status: 'cancelled' },
            { new: true, runValidtors: true }
        )

        if (!order) {
            console.log(
                `⚠️ Order ${orderId} was not found or not in pending state.`
            )
            throw new NotFoundError('Order not found')
        }

        return order
    }
}
