import { inject, injectable } from 'tsyringe'

import {
    ITerminalSessionRepository,
    ITerminalSessionService,
    TerminalContext,
} from './terminalSession.type'

import { TerminalSessionType } from './terminalSession.model'
import { TERMINAL_SESSION_STATUS } from './terminalSession.constant'
import { AUTH_TYPE } from '../../auth/user.constant'
import { Payload } from '../../auth/interfaces/authInterface'
import { TOKENS } from '../../../config/tokens'
import { UnauthorizedError } from '../../../errors/httpErrors'
import { generateTokenForTerminal } from '../../../utils/jwtService'
import { ISessionService } from '../../session/session.type'
import { ITerminalRepository } from '../terminal.type'

@injectable()
export class TerminalSessionService implements ITerminalSessionService {
    constructor(
        @inject(TOKENS.TERMINAL_REPOSITORY)
        private terminalRepository: ITerminalRepository,
        @inject(TOKENS.TERMINAL_SESSION_REPOSITORY)
        private terminalSessionRepository: ITerminalSessionRepository,
        @inject(TOKENS.SESSION_SERVICE) private session: ISessionService
    ) {}

    async terminalLogin(
        terminalId: string,
        email: string,
        pin: string
    ): Promise<TerminalContext> {
        const context = await this.terminalRepository.getAuthorizedContext(
            terminalId,
            email
        )

        if (!context || context.activationCode !== pin) {
            throw new UnauthorizedError('Invalid credentials')
        }

        const data: TerminalSessionType = {
            terminalId: terminalId,
            assignId: context.user._id.toString(),
            status: TERMINAL_SESSION_STATUS.ACTIVE,
            assignTime: new Date(),
        }

        const terminalSession =
            await this.terminalSessionRepository.createTerminalSession(data)

        const payload: Payload = {
            type: AUTH_TYPE.TERMINAL_ACCESS,
            sub: context.user._id.toString(),
            email: context.user.email,
            businessId: context.businessId.toString(),
            role: context.membership.role,
            terminalId: terminalId,
            terminalSessionId: terminalSession.id,
            // sessionStatus: terminalSession.status,   WORKING HERE
        }

        const token = await generateTokenForTerminal(payload)
        await this.session.createSession(token, payload)

        //set the terminal automatically logout after given time.
        // owner set the time for automatically logout if terminal is not logged out

        return {
            token,
            user: {
                email: context.user.email,
                role: context.membership.role,
            },
        }
    }

    async terminalLogout(terminalSessionId: string): Promise<boolean> {
        const closeSession =
            await this.terminalSessionRepository.closeTerminalSession(
                terminalSessionId
            )

        if (closeSession?.status !== TERMINAL_SESSION_STATUS.INACTIVE) {
            return false
        }

        return true
    }
}
