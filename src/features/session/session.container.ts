import { container } from 'tsyringe'
import { ISessionService } from './session.type'
import { TOKENS } from '../../config/tokens'
import { SessionService } from './session.service'

container.registerSingleton<ISessionService>(
    TOKENS.SESSION_SERVICE,
    SessionService
)
