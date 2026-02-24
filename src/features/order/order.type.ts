import { OrderDocument, OrderType } from './order.model'
import { RouteHandler } from '../../shared/baseType'
import { ICrudController } from '../../shared/crudControllerInterface'
import { OrderItemType } from './orderItems/orderItem.model'
import { PaymentInputType } from '../payment/payment.validation'
import { ClientSession } from 'mongoose'

export interface IOrderController extends ICrudController {
    completeOrder: RouteHandler
    refundOrder: RouteHandler
    cancelOrder: RouteHandler
}

export interface IOrderService {
    createOrder(items: OrderItemType[]): Promise<OrderType>
    completeOrder(items: PaymentInputType): Promise<OrderType>
    getOrder(orderId: string): Promise<void> //need to change return type
    updateOrderStatus(orderId: string, status: string): Promise<void>
    refundOrder(orderId: string): Promise<void>
    cancelOrder(orderId: string): Promise<void>
}

export interface IOrderRepository {
    createOrder(
        orderId: number,
        items: OrderItemType[],
        total: number
    ): Promise<OrderType>
    orderById(id: string): Promise<OrderDocument | null>
    completeOrder(
        orderId: string,
        paidAmount: number,
        session?: ClientSession
    ): Promise<OrderDocument | null>
    // getOrder(orderId: string): Promise<OrderType>
    // updateOrderStatus(orderId: string, status: string): Promise<void>
    // refundOrder(orderId: string): Promise<void>
    // cancelOrder(orderId: string): Promise<void>
    // generateOrderNumber(): Promise<string>
}
