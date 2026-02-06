import { container } from 'tsyringe'
import { authHandler } from '../../middlewares/authHandler'
import { hasPermission } from '../../middlewares/hasPermission'
import { createCrudRoutes } from '../../shared/baseRouter'

import { TOKENS } from '../../config/tokens'

import { IUserController } from './user.type'
export const userController = container.resolve<IUserController>(
    TOKENS.USER_CONTROLLER
)

export default createCrudRoutes(userController, {
    exclude: [],
    middleware: [authHandler, hasPermission('manage_users')],
})

// authHandler, hasPermission('manage_users')
