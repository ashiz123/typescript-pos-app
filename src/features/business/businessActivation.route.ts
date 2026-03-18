import { createCrudRoutes } from '../../shared/baseRouter'
import { businessController } from './business.route'

export default createCrudRoutes(businessController, {
    exclude: [],
    middleware: [],
    additionalRoute: [
        {
            name: 'business_activate',
            method: 'get',
            path: '/:userId/:token',
            handler: businessController.activateForm,
        },
        {
            name: 'update_business_activate',
            method: 'post',
            path: '/:userId/:token',
            handler: businessController.updateActivate,
        },
    ],
})
