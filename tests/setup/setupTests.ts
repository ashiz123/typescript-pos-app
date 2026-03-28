import { beforeAll, afterAll } from 'vitest'
import 'reflect-metadata'
import Database from '../../src/config/databaseConnection.js'
import {
    getRedisClient,
    connectRedis,
} from '../../src/config/redisConnection.js'
import { container } from 'tsyringe'

const db = container.resolve(Database)
const redisClient = getRedisClient()

beforeAll(async () => {
    await db.connect()
    await db.dropAllDatabase()
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
