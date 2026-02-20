import { container } from 'tsyringe'
import { IOrderItemRepository } from './orderItem.type'
import { TOKENS } from '../../../config/tokens'
import { OrderItemRepository } from './orderItem.repository'

container.registerSingleton<IOrderItemRepository>(
    TOKENS.ORDER_ITEM_REPOSITORY,
    OrderItemRepository
)
