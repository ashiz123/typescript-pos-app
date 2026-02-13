import { userController } from './user.route'
import { createCrudRoutes } from '../../shared/nonCrudRouter'

export default createCrudRoutes(userController, {
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
