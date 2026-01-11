import { RouteHandler } from './baseType'

export interface ICrudController {
    //Object literal type
    list: RouteHandler
    getById: RouteHandler
    create: RouteHandler
    update: RouteHandler
    remove: RouteHandler
}
