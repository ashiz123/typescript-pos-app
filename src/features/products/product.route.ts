// import { authHandler } from '../../middlewares/authHandler'
import { createCrudRoutes } from '../../shared/baseRouter'
import { productController } from './product.controller'

export default createCrudRoutes(productController, {
    exclude: [],
    middleware: [],
    additionalRoute: [
        {
            name: 'getByCategoryId',
            method: 'get',
            path: '/ofCategory/:id',
            handler: productController.filterByCategory,
        },
    ],
})
