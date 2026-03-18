import { OrderItemType, OrderItemDocument } from './orderItem.model'

export interface IOrderItemRepository {
    createOrderItem(data: OrderItemType): Promise<OrderItemDocument>
    refundOrderItem(orderItemId: string): Promise<boolean>
}
