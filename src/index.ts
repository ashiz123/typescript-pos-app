import app from './app.js'
import Database from './config/databaseConnection.js'
import { connectRedis } from './config/redisConnection.js'
import { logger } from './middlewares/logHandler.js'

async function bootstrap() {
    try {
        const port = process.env.PORT || 3000
        logger.info(`Starting application in ${process.env.NODE_ENV} mode`)
        console.log('Environment:', process.env.NODE_ENV)

        await connectRedis()
        const db = Database.getInstance()
        await db.connect()
        logger.info('Connected to MongoDB successfully')

        const server = app.listen(port, () => {
            console.log(`App listening on port ${port}`)
            logger.info(`App listening on port ${port}`)
        })

        server.on('error', (err) => {
            logger.error('Server error:', err)
        })
    } catch (err) {
        logger.error('Error during application bootstrap:', err)
    }
}

bootstrap()
