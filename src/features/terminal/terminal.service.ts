import { Connection } from 'mongoose'
import { TOKENS } from '../../config/tokens'
import { generateActivationCode } from '../../utils/token'
import { TERMINAL_PAYMENT_STATUS, TERMINAL_STATUS } from './terminal.constant'
import {
    CreateTerminal,
    TerminalDocument,
    TerminalType,
} from './terminal.model'
import { ITerminalRepository, ITerminalService } from './terminal.type'
import { injectable, inject } from 'tsyringe'
import { IAdminRequestService } from '../adminRequest/adminRequest.type'
import { CreateAdminRequestType } from '../adminRequest/adminRequest.model'

@injectable()
export class TerminalService implements ITerminalService {
    constructor(
        @inject(TOKENS.DATABASE_CONNECTION)
        private readonly connection: Connection,
        @inject(TOKENS.TERMINAL_REPOSITORY)
        private readonly terminalRepository: ITerminalRepository,
        @inject(TOKENS.ADMIN_REQUEST_SERVICE)
        private readonly adminRequestService: IAdminRequestService
    ) {}

    async createTerminal(data: CreateTerminal): Promise<TerminalDocument> {
        const session = await this.connection.startSession()

        try {
            const terminalData: TerminalType = {
                ownerId: data.ownerId,
                businessId: data.businessId,
                name: data.name,
                status: TERMINAL_STATUS.REQUESTED,
                paymentStatus: TERMINAL_PAYMENT_STATUS.PENDING,
                activationCode: generateActivationCode(),
            }

            const newTerminal = await this.terminalRepository.createWithSession(
                terminalData,
                session
            )

            const adminData: CreateAdminRequestType = {
                requestedBy: newTerminal.ownerId.toString(),
                targetId: newTerminal.businessId.toString(),
                note: data.note,
            }

            await this.adminRequestService.createWithSession(adminData, session)

            //send email using queue

            await session.commitTransaction()

            return newTerminal
        } catch (error) {
            await session.abortTransaction()
            console.error('Transaction aborted due to error:', error)
            throw error
        } finally {
            session.endSession()
        }
    }

    // async findByBusinessId(businessId: string): Promise<TerminalType[]> {}

    // async approveTerminal(id: string): Promise<TerminalType | null> {}
}
