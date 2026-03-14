import { inject, injectable } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { INotificationDocument, INotificationType } from './notification.model'
import { INotificationRepository } from './notification.type'
import { Model } from 'mongoose'
import { USER_ROLE } from '../auth/user.constant'

@injectable()
export class NotificationRepository implements INotificationRepository {
    constructor(
        @inject(TOKENS.NOTIFICATION_MODEL)
        private readonly _model: Model<INotificationDocument>
    ) {}

    async create(data: INotificationType): Promise<INotificationDocument> {
        return await this._model.create(data)
    }

    async getAdminNotifications(): Promise<INotificationDocument[]> {
        return await this._model
            .find({ receipientType: USER_ROLE.ADMIN })
            .sort({ createdAt: -1 })
            .limit(100)
    }
}
