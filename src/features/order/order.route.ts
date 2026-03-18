import { container } from 'tsyringe'
import { createCrudRoutes } from '../../shared/baseRouter'
import { IOrderController } from './order.type'
import { TOKENS } from '../../config/tokens'
import { authHandler } from '../../middlewares/authHandler'

export const orderController = container.resolve<IOrderController>(
    TOKENS.ORDER_CONTROLLER
)

export default createCrudRoutes(orderController, {
    exclude: [],
    middleware: [authHandler],
    additionalRoute: [
        {
            name: 'complete_order',
            method: 'post',
            path: '/complete_order',
            handler: orderController.completeOrder,
        },
    ],
})
