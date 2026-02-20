import { IOrderItem, OrderItemDocument } from './orderItem.model'

export interface IOrderItemRepository {
    createOrderItem(data: IOrderItem): Promise<OrderItemDocument>
    refundOrderItem(orderItemId: string): Promise<boolean>
}
