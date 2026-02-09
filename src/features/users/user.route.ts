import { container } from 'tsyringe'
import { hasPermission } from '../../middlewares/hasPermission'
import { createCrudRoutes } from '../../shared/baseRouter'

import { TOKENS } from '../../config/tokens'

import { IUserController } from './user.type'
import { authWithBusinessHandler } from '../../middlewares/authWithBusinessHandler'
export const userController = container.resolve<IUserController>(
    TOKENS.USER_CONTROLLER
)

export default createCrudRoutes(userController, {
    exclude: [],
    middleware: [authWithBusinessHandler, hasPermission('manage_users')],
})

// authHandler, hasPermission('manage_users')
