import { container } from 'tsyringe'
import { createCrudRoutes } from '../../shared/baseRouter'
import { IOrderController } from './order.type'
import { TOKENS } from '../../config/tokens'

export const orderController = container.resolve<IOrderController>(
    TOKENS.ORDER_CONTROLLER
)

export default createCrudRoutes(orderController, {
    exclude: [],
    middleware: [],
})
