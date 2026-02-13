import { EventEmitter } from 'events'

//.on - find everyone who is listening for notifications
//.off - remove a listener for notifications
//.emit - send a notification to all listeners
//once - send a notification to a single listener
interface NotificationData {
    email: string
    subject: string
    message: string
}

export class NotificationService extends EventEmitter {
    constructor() {
        super()
    }

    notify(message: NotificationData) {
        this.emit('notification', message)
    }

    onNotification(callback: (message: NotificationData) => void) {
        this.on('notification', callback)
    }
}

export const notificationService = new NotificationService()
