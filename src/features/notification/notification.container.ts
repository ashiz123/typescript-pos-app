import { container } from 'tsyringe'
import { Queue } from 'bullmq'
import { INotificationDocument, NotificationModel } from './notification.model'
import { TOKENS } from '../../config/tokens'
import { Model } from 'mongoose'
import {
    INotificationController,
    INotificationRepository,
    INotificationService,
} from './notification.type'
import { NotificationRepository } from './notification.repository'
import { NotificationService } from './notification.service'
import { NotificationToAdminQueue } from '../../queues/notificationToAdminQueue'
import { NotificationController } from './notification.controller'
import { NotificationToOwnerQueue } from '../../queues/notificationToOwnerQueue'

container.registerInstance<Model<INotificationDocument>>(
    TOKENS.NOTIFICATION_MODEL,
    NotificationModel
)

container.registerSingleton<INotificationRepository>(
    TOKENS.NOTIFICATION_REPOSITORY,
    NotificationRepository
)

container.registerSingleton<INotificationService>(
    TOKENS.NOTIFICATION_SERVICE,
    NotificationService
)

container.registerSingleton<INotificationController>(
    TOKENS.NOTIFICATION_CONTROLLER,
    NotificationController
)

container.registerInstance<Queue>(
    TOKENS.NOTIFICATION_ADMIN_QUEUE,
    NotificationToAdminQueue
)

container.registerInstance<Queue>(
    TOKENS.NOTIFICATION_OWNER_QUEUE,
    NotificationToOwnerQueue
)
