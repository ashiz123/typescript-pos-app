import { container } from 'tsyringe'
import { TOKENS } from '../config/tokens'
import { sendEmail } from '../utils/sendEmail'
import { IInternalNotificationEmitter } from './notification.emitter'
// import { notificationService } from './notification.emitter'

const notificationService = container.resolve<IInternalNotificationEmitter>(
    TOKENS.NOTIFICATION_EMITTER
)

notificationService.onNotification(async (data) => {
    try {
        await sendEmail(data.email, data.subject, data.message)
    } catch (err) {
        console.error('Email Observer failed to send email', err)
    }
})
