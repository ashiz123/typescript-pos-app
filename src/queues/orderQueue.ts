import { ConnectionOptions, Queue } from 'bullmq'
import { redisConnect } from '../config/ioRedisConnection'

export const orderQueue = new Queue('order', {
    connection: redisConnect as unknown as ConnectionOptions,
})
