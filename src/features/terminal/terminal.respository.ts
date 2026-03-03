import { CrudRepository } from '../../shared/crudRepository'
import { CreateTerminalDTO } from './terminal.validation'
import {
    TerminalDocument,
    TerminalModel,
    UpdateTerminalDTO,
} from './terminal.model'
import { injectable } from 'tsyringe'
import { ITerminalRepository } from './terminal.type'
import { ClientSession } from 'mongoose'

@injectable()
export class TerminalRepository
    extends CrudRepository<
        TerminalDocument,
        CreateTerminalDTO,
        UpdateTerminalDTO
    >
    implements ITerminalRepository
{
    constructor() {
        super(TerminalModel)
    }

    async createWithSession(
        data: CreateTerminalDTO,
        session: ClientSession
    ): Promise<TerminalDocument> {
        const [terminal] = await this.model.create([data], { session })
        return terminal
    }
}
