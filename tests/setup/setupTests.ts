import { beforeAll, afterAll, beforeEach } from 'vitest'
import Database from '../../src/config/databaseConnection.js'
import {
    getRedisClient,
    connectRedis,
} from '../../src/config/redisConnection.js'

const db = Database.getInstance()
const redisClient = getRedisClient()

beforeAll(async () => {
    await db.dropAllDatabase()
    await db.connect()
    await connectRedis()
})

afterAll(async () => {
    await db.dropAllDatabase()
    await db.disconnect()

    if (redisClient.isOpen) {
        await redisClient.quit() // वा .disconnect() तपाईँको लाइब्रेरी अनुसार
        console.log('🔌 Redis Disconnected Successfully')
    }
})
