import { NextFunction, Request, Response } from 'express'
import { TOKENS } from '../../config/tokens'
import { ITerminalController, ITerminalService } from './terminal.type'
import { injectable, inject } from 'tsyringe'
import { CreateTerminalDTO, TerminalValidation } from './terminal.validation'
import { UnauthorizedError } from '../../errors/httpErrors'

@injectable()
export class TerminalController implements ITerminalController {
    constructor(
        @inject(TOKENS.TERMINAL_SERVICE)
        private terminalService: ITerminalService
    ) {}

    createTerminal = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.user) {
                throw new UnauthorizedError('Authenticated user not found')
            }
            const { businessId, userId } = req.user
            const ownerId = userId
            const parsedValidatedData: CreateTerminalDTO =
                TerminalValidation.parse(req.body)
            const data = { ...parsedValidatedData, businessId, ownerId }
            const result = await this.terminalService.createTerminal(data)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    approveTerminal = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        return
    }
}
