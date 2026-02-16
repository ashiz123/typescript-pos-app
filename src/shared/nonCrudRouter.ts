import express, { Router } from 'express'
import { RouteConfig, RouteHandler } from './baseType'

type OptionType = {
    exclude: string[]
    middleware: RouteHandler[]
    additionalRoute?: RouteConfig[]
    commonPathPrefix?: string
}

export function createNonCrudRoutes(controller, options: OptionType): Router {
    const router = express.Router()
    const {
        middleware,
        exclude,
        additionalRoute,
        commonPathPrefix = '',
    } = options

    const routes: RouteConfig[] = []

    if (additionalRoute && additionalRoute.length > 0) {
        routes.push(...additionalRoute)
    }

    routes.forEach((route) => {
        if (!exclude.includes(route.name)) {
            router[route.method](
                commonPathPrefix + route.path,
                ...middleware,
                route.handler
            )
        }
    })

    return router
}
