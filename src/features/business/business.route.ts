import { hasPermission } from '../../middlewares/hasPermission'
import { createCrudRoutes } from '../../shared/baseRouter'
import { container } from 'tsyringe'
import { IBusinessController } from './business.type'
import { TOKENS } from '../../config/tokens'
import { authWithBusinessHandler } from '../../middlewares/authWithBusinessHandler'

export const businessController = container.resolve<IBusinessController>(
    TOKENS.BUSINESS_CONTROLLER
)

export default createCrudRoutes(businessController, {
    exclude: [],
    middleware: [authWithBusinessHandler, hasPermission('create_business')],
})
