import { injectable, inject } from 'tsyringe'
import { Payload } from '../auth/interfaces/authInterface'
import { ISessionService } from './session.type'
import { TOKENS } from '../../config/tokens'
import Redis from 'ioredis'
import { NotFoundError } from '../../errors/httpErrors'

@injectable()
export class SessionService implements ISessionService {
    constructor(@inject(TOKENS.REDIS_CONNECT) private redis: Redis) {}

    async createSession(token: string, payload: Payload): Promise<void> {
        await this.redis.set(
            `session:${token}`,
            JSON.stringify(payload),
            'EX',
            3600
        )
        return
    }

    async getSession(token: string): Promise<Payload> {
        const session = await this.redis.get(`session:${token}`)
        if (!session) {
            throw new NotFoundError('Session not found')
        }
        return JSON.parse(session) as Payload
    }

    async deleteSession(token: string): Promise<void> {
        await this.redis.del(`session:${token}`)
    }
}
