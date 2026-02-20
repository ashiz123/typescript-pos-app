import { container } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { IOrderController, IOrderRepository, IOrderService } from './order.type'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { OrderRepository } from './order.repository'

container.registerSingleton<IOrderController>(
    TOKENS.ORDER_CONTROLLER,
    OrderController
)
container.registerSingleton<IOrderService>(TOKENS.ORDER_SERVICE, OrderService)
container.registerSingleton<IOrderRepository>(
    TOKENS.ORDER_REPOSITORY,
    OrderRepository
)
