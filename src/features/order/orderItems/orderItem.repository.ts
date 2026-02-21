import { injectable } from 'tsyringe'
import {
    CreateOrderItemDTO,
    OrderItemDocument,
    OrderItemModel,
    OrderItemType,
} from './orderItem.model'
import { IOrderItemRepository } from './orderItem.type'

@injectable()
export class OrderItemRepository implements IOrderItemRepository {
    private orderItemModel: typeof OrderItemModel

    constructor() {
        this.orderItemModel = OrderItemModel
    }

    async createOrderItem(data: OrderItemType): Promise<OrderItemDocument> {
        const orderItem = await this.orderItemModel.create(data)
        return orderItem
    }

    async refundOrderItem(orderItem: string): Promise<boolean> {
        return true
    }
}
