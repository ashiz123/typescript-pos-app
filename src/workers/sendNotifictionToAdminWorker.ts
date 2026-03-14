import { Worker, Job } from 'bullmq'
import { container, inject, injectable } from 'tsyringe'
import { TOKENS } from '../config/tokens'
import { INotificationService } from '../features/notification/notification.type'
import Redis from 'ioredis'

@injectable()
export class AdminNotificationWorker {
    private _worker: Worker | null = null

    constructor(
        @inject(TOKENS.NOTIFICATION_SERVICE)
        private notificationService: INotificationService,
        @inject(TOKENS.REDIS_CONNECT) private _redisConn: Redis
    ) {}

    public setup(): Worker {
        console.log('worker triggering')
        this._worker = new Worker(
            'notificationToAdmin',
            async (job: Job) => {
                const { terminalId, businessId, ownerId } = job.data

                try {
                    await this.notificationService.notifyTerminalCreate(
                        terminalId,
                        businessId,
                        ownerId
                    )
                } catch (error) {
                    console.log(error)
                }
            },
            { connection: this._redisConn }
        )
        return this._worker
    }
}

container.resolve(AdminNotificationWorker).setup() //worker running here
