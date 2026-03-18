import { Queue } from 'bullmq'
import { redisConnect } from '../config/ioRedisConnection'

export const NotificationToOwnerQueue = new Queue('notificationToOwner', {
    connection: redisConnect,
})
