import { Request, Response, NextFunction } from 'express'

// Factory pattern
//options is for middleware, validation or some exclude option

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' //union type

export type RouteHandler = (
    //function type
    req: Request,
    res: Response,
    next: NextFunction
) => void | Promise<void>

//config type
export type RouteConfig = {
    // name: keyof ICrudController
    name: string
    method: HttpMethod
    path: string
    handler: RouteHandler
}
