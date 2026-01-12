import express, { Router } from 'express'
import { RouteConfig, RouteHandler } from './baseType'
import { ICrudController } from './crudControllerInterface'

type OptionType = {
    exclude: string[]
    middleware: RouteHandler[]
}

export function createCrudRoutes(
    controller: ICrudController,
    options: OptionType
): Router {
    const router = express.Router()
    const { middleware, exclude } = options

    const routes: RouteConfig[] = [
        {
            name: 'list',
            method: 'get',
            path: '/',
            handler: controller.list,
        },
        {
            name: 'getById',
            method: 'get',
            path: '/:id',
            handler: controller.getById,
        },
        {
            name: 'create',
            method: 'post',
            path: '/create',
            handler: controller.create,
        },
        {
            name: 'update',
            method: 'put',
            path: '/update/:id',
            handler: controller.update,
        },
        {
            name: 'remove',
            method: 'delete',
            path: '/delete/:id',
            handler: controller.remove,
        },
    ] as const

    routes.forEach((route) => {
        if (!exclude.includes(route.name)) {
            router[route.method](route.path, ...middleware, route.handler)
        }
    })

    return router
}
