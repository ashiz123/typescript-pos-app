import { ClientSession } from 'mongoose'
import { ICrudRepository } from '../../shared/crudRepository'
import { TerminalDocument, UpdateTerminalDTO } from './terminal.model'
import { CreateTerminalDTO } from './terminal.validation'
import { Request, Response, NextFunction } from 'express'

export interface ITerminalRepository extends ICrudRepository<
    TerminalDocument,
    CreateTerminalDTO,
    UpdateTerminalDTO
> {
    createWithSession(
        data: CreateTerminalDTO,
        session: ClientSession
    ): Promise<TerminalDocument>
}

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
