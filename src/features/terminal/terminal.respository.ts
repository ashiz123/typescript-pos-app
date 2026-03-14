import { CrudRepository } from '../../shared/crudRepository'
import { CreateTerminalDTO } from './terminal.validation'
import {
    ApproveTerminal,
    TerminalDocument,
    TerminalModel,
    TerminalType,
    UpdateTerminalDTO,
} from './terminal.model'
import { injectable } from 'tsyringe'
import { ITerminalRepository } from './terminal.type'
import { ClientSession } from 'mongoose'
import { TERMINAL_STATUS } from './terminal.constant'

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

    async changeTerminalStatus(
        data: ApproveTerminal
    ): Promise<TerminalDocument | null> {
        return await this.model.findOneAndUpdate(
            {
                _id: data.terminalId,
                businessId: data.businessId,
                status: TERMINAL_STATUS.REQUESTED,
            },
            {
                $set: {
                    status: TERMINAL_STATUS.APPROVED,
                    approvedAt: data.approvedAt,
                    approvedBy: data.approvedBy,
                },
            },
            { new: true }
        )
    }

    async getTerminalById(
        terminalId: string,
        businessId: string
    ): Promise<TerminalDocument | null> {
        return await this.model.findOne({
            _id: terminalId,
            businessId: businessId,
        })
    }

    async getTerminalsByBusinessId(
        businessId: string
    ): Promise<TerminalDocument[]> {
        return await this.model.find({
            businessId,
            status: TERMINAL_STATUS.APPROVED,
        })
    }
}
