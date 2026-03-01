import { CrudRepository } from '../../shared/crudRepository'
import { CreateTerminalDTO } from './terminal.validation'
import {
    TerminalDocument,
    TerminalModel,
    UpdateTerminalDTO,
} from './terminal.model'
import { injectable } from 'tsyringe'
import { ITerminalRepository } from './terminal.type'

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
}
