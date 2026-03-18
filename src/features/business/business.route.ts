import { createCrudRoutes } from '../../shared/baseRouter'
import { container } from 'tsyringe'
import { IBusinessController } from './business.type'
import { TOKENS } from '../../config/tokens'
import { authHandler } from '../../middlewares/authHandler'

export const businessController = container.resolve<IBusinessController>(
    TOKENS.BUSINESS_CONTROLLER
)

export default createCrudRoutes(businessController, {
    exclude: [],
    middleware: [authHandler],
})
