import { TOKENS } from '../../config/tokens'
import { generateActivationCode } from '../../utils/token'
import { TERMINAL_PAYMENT_STATUS, TERMINAL_STATUS } from './terminal.constant'
import { TerminalDocument, TerminalType } from './terminal.model'
import { TerminalRepository } from './terminal.respository'
import { ITerminalService } from './terminal.type'
import { CreateTerminalDTO } from './terminal.validation'
import { injectable, inject } from 'tsyringe'

@injectable()
export class TerminalService implements ITerminalService {
    constructor(
        @inject(TOKENS.TERMINAL_REPOSITORY)
        private terminalRepository: TerminalRepository
    ) {}

    async createTerminal(data: TerminalType): Promise<TerminalDocument> {
        const terminalData: TerminalType = {
            businessId: data.businessId,
            name: data.name,
            status: TERMINAL_STATUS.REQUESTED,
            paymentStatus: TERMINAL_PAYMENT_STATUS.PENDING,
            activationCode: generateActivationCode(),
        }

        return await this.terminalRepository.create(terminalData)
    }

    // async findByBusinessId(businessId: string): Promise<TerminalType[]> {}

    // async approveTerminal(id: string): Promise<TerminalType | null> {}
}
