import { container } from 'tsyringe'
import { TOKENS } from '../config/tokens'
import {
    IInternalNotificationEmitter,
    InternalNotificationEmitter,
} from './notification.emitter'

container.registerSingleton<IInternalNotificationEmitter>(
    TOKENS.NOTIFICATION_EMITTER,
    InternalNotificationEmitter
)
