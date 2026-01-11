import { RouteHandler } from '../../shared/baseType'

export type BusinessController = {
    list: RouteHandler
    getById: RouteHandler
    create: RouteHandler
    update: RouteHandler
    remove: RouteHandler
}

export interface CreateBusinessRequest {
    nae: string
    address: string
    websisste?: string
}

// export interface BusinessService<Business> {
//     getAll(): Promise<Business[]>
//     getById(id: string): Promise<Business>
//     create(data: BusinessDTO): Promise<Business>
//     update(id: string, data: BusinessDTO): Promise<Business | null>
//     delete(id: string): Promise<boolean>
// }
