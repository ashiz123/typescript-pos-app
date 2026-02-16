import { createNonCrudRoutes } from '../../shared/nonCrudRouter'
import { userController } from './user.route'

export default createNonCrudRoutes(userController, {
    exclude: [],
    middleware: [],
    additionalRoute: [
        {
            name: 'user_activate',
            method: 'get',
            path: '/:businessId/:token',
            handler: userController.activateFormWithPassword,
        },
        {
            name: 'update_user_Activate',
            method: 'post',
            path: '',
            handler: userController.updateActivate,
        },
    ],
})
