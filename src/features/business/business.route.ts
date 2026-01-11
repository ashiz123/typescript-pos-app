import { authHandler } from '../../middlewares/authHandler'
import { createCrudRoutes } from '../../shared/baseRouter'
import { businessController } from './business.controller'

export default createCrudRoutes(businessController, {
    exclude: [],
    middleware: [authHandler],
})
