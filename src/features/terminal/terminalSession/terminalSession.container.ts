import { container } from 'tsyringe'
import { Model } from 'mongoose'

import { TerminalSessionService } from './terminalSession.service'
import {
    ITerminalSessionRepository,
    ITerminalSessionService,
} from './terminalSession.type'
import {
    ITerminalSessionDocument,
    TerminalSessionModel,
} from './terminalSession.model'
import { TerminalSessionRepository } from './terminalSession.respository'
import { TOKENS } from '../../../config/tokens'

container.registerInstance<Model<ITerminalSessionDocument>>(
    TOKENS.TERMINAL_SESSION_MODEL,
    TerminalSessionModel
)

container.registerSingleton<ITerminalSessionRepository>(
    TOKENS.TERMINAL_SESSION_REPOSITORY,
    TerminalSessionRepository
)

container.registerSingleton<ITerminalSessionService>(
    TOKENS.TERMINAL_SESSION_SERVICE,
    TerminalSessionService
)
