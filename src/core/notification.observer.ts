import { sendEmail } from '../utils/sendEmail'
import { notificationService } from './notification.service'

notificationService.onNotification(async (data) => {
    try {
        await sendEmail(data.email, data.subject, data.message)
    } catch (err) {
        console.error('Email Observer failed to send email', err)
    }
})
