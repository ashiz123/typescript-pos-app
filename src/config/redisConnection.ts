import { createClient, RedisClientType } from 'redis'
import { logger } from '../middlewares/logHandler.js'

const redisURL: string = process.env.REDIS_URL || ''

if (!redisURL) {
    throw new Error('REDIS_URL is not defined in environment variables')
}

//create and export redis client
export const redisClient: RedisClientType = createClient({
    url: redisURL,
})

redisClient.on('connect', () => console.log('Redis client connecting...'))
redisClient.on('ready', () => console.log('Redis client ready'))
redisClient.on('end', () => console.log('Redis disconnected'))
redisClient.on('error', (err) => console.log('Redis client error:', err))

export async function connectRedis(): Promise<void> {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
            logger.info('Connected to Redis successfully')
        } else {
            logger.info('Redis client is already connected')
        }
    } catch (error) {
        logger.error('Error connecting to Redis:', error)
    }
}
