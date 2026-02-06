// load variables from .env
import mongoose from 'mongoose'
import { logger } from '../middlewares/logHandler.js'

class Database {
    private static instance: Database
    private constructor() {} //it block direct instantiaion;

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }

    public async connect(): Promise<void> {
        if (
            mongoose.connection.readyState === 1 ||
            mongoose.connection.readyState === 2
        ) {
            logger.info('Mongodb already connected')
            return
        }

        if (process.env.MONGODB_URL === undefined) {
            console.error('MONGODB_URL is not defined in environment variables')
            process.exit(1)
        }

        console.log('Attempting connecting mongo db')
        const mongo_uri: string = process.env.MONGODB_URL

        try {
            const conn = await mongoose.connect(mongo_uri)
            console.log(`mongodb connected: ${conn.connection.host}`)
        } catch (error) {
            console.error('Connection failed with error:', error)
            process.exit(1)
        }
    }

    public async disconnect() {
        try {
            await mongoose.connection.close()
            console.log('MongoDB Disconnected Successfully')
        } catch (error) {
            console.error('Error connecting db', error)
            process.exit(1)
        }
    }

    public async dropAllDatabase() {
        try {
            if (mongoose.connection.db) {
                await mongoose.connection.db.dropDatabase()
                console.log('Database dropped successfully')
            } else {
                console.error('No active database connection to drop')
            }
        } catch (error) {
            console.error('Error dropping dbs', error)
            process.exit(1)
        }
    }
}

export default Database
