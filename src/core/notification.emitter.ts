import { EventEmitter } from 'events'
import { singleton } from 'tsyringe'

//.on - find everyone who is listening for notifications
//.off - remove a listener for notifications
//.emit - send a notification to all listeners
//once - send a notification to a single listener
interface NotificationEmitterType {
    email: string
    subject: string
    message: string
}

export interface IInternalNotificationEmitter {
    notify(message: NotificationEmitterType): void
    onNotification(callback: (message: NotificationEmitterType) => void): void
}

@singleton()
export class InternalNotificationEmitter
    extends EventEmitter
    implements IInternalNotificationEmitter
{
    constructor() {
        super()
    }

    notify(message: NotificationEmitterType): void {
        console.log('notify emitter', message)
        this.emit('notification', message)
    }

    onNotification(callback: (message: NotificationEmitterType) => void): void {
        this.on('notification', callback)
    }
}

// export const notificationService = new InternalNotificationEmitter()
