import { container } from 'tsyringe'
import { redisConnect } from './ioRedisConnection'
import { TOKENS } from './tokens'

container.registerInstance(TOKENS.REDIS, redisConnect)
