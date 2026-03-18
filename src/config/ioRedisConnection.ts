import IORedis from 'ioredis'

export const redisConnect = new IORedis({
    host: process.env.REDIS_HOST || 'redis_pos',
    port: Number(process.env.REDIS_PORT || 6379),
    maxRetriesPerRequest: null,
})

console.log('redis connect', process.env.REDIS_HOST)

redisConnect.on('ready', () => {
    console.log('✅ Redis is ready to receive commands!')
})

redisConnect.on('error', (err) => {
    console.log('⚠️ Redis is not ready yet. Retrying...', err)
})
