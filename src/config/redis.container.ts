import { container } from 'tsyringe'
import { redisConnect } from './ioRedisConnection'
import { TOKENS } from './tokens'
import Redis from 'ioredis'

container.registerInstance<Redis>(TOKENS.REDIS_CONNECT, redisConnect)

console.log('Redis container is ready')
