import { Queue } from 'bullmq'
import { redisConnect } from '../config/ioRedisConnection'

export const NotificationToAdminQueue = new Queue('notificationToAdmin', {
    connection: redisConnect,
})
