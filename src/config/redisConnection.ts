import { createClient, RedisClientType } from 'redis'
import { logger } from '../middlewares/logHandler.js'

let redisClient: RedisClientType | null = null

export const getRedisUrl = () => {
    const redisURL: string = process.env.REDIS_URL || ''
    if (!redisURL) {
        throw new Error('REDIS_URL is not defined in environment variables')
    }

    return redisURL
}

export const getRedisClient = (): RedisClientType => {
    if (!redisClient) {
        redisClient = createClient({
            url: getRedisUrl(),
        })

        redisClient.on('connect', () =>
            console.log('Redis client connecting...')
        )
        redisClient.on('ready', () => console.log('Redis client ready'))
        redisClient.on('end', () => console.log('Redis disconnected'))
        redisClient.on('error', (err) =>
            console.log('Redis client error:', err)
        )
    }

    return redisClient
}

export async function connectRedis(): Promise<void> {
    try {
        const client = getRedisClient()
        if (!client.isOpen) {
            await client.connect()
            logger.info('Connected to Redis successfully')
        } else {
            logger.info('Redis client is already connected')
        }
    } catch (error) {
        logger.error('Error connecting to Redis:', error)
    }
}
