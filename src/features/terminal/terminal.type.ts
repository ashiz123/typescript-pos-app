import { ICrudRepository } from '../../shared/crudRepository'
import {
    TerminalDocument,
    TerminalType,
    UpdateTerminalDTO,
} from './terminal.model'
import { CreateTerminalDTO } from './terminal.validation'
import { ICrudService } from '../../shared/crudServiceInterface'
import { RouteHandler } from '../../shared/baseType'
import { Request, Response, NextFunction } from 'express'

export type ITerminalRepository = ICrudRepository<
    TerminalDocument,
    CreateTerminalDTO,
    UpdateTerminalDTO
>

export interface ITerminalService {
    createTerminal(data: CreateTerminalDTO): Promise<TerminalDocument>
    // findByBusinessId(businessId: string): Promise<TerminalType[]>
    // approveTerminal(id: string): Promise<TerminalType | null>
}

export interface ITerminalController {
    createTerminal(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>
    approveTerminal(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>
    // findByBusinessId: RouteHandler
    // stopTerminal: RouteHandler
    // deleteTerminal: RouteHandler
}
