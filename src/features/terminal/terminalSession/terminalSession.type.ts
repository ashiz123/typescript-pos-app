import { TERMINAL_SESSION_STATUS } from './terminalSession.constant'
import {
    ITerminalSessionDocument,
    TerminalSessionType,
} from './terminalSession.model'

export type TerminalSessionStatus =
    (typeof TERMINAL_SESSION_STATUS)[keyof typeof TERMINAL_SESSION_STATUS]

export type TerminalContext = {
    token: string
    user: {
        email: string
        role: string
    }
}

export interface ITerminalSessionService {
    terminalLogin(
        terminalId: string,
        email: string,
        pin: string
    ): Promise<TerminalContext>
    terminalLogout(terminalSessionId: string): Promise<boolean>
}

export interface ITerminalSessionRepository {
    createTerminalSession(
        data: TerminalSessionType
    ): Promise<ITerminalSessionDocument>
    closeTerminalSession(
        terminalSessionId: string
    ): Promise<ITerminalSessionDocument | null>
}
