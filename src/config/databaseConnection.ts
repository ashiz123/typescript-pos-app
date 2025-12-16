// load variables from .env
import mongoose from 'mongoose'

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
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB already connected')
            return
        }

        if (process.env.MONGODB_URL === undefined) {
            console.error('MONGODB_URL is not defined in environment variables')
            process.exit(1)
        }

        const mongo_uri: string =
            `${process.env.MONGO_DRIVER}://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/pos_db?authSource=admin` ||
            process.env.MONGODB_URL

        try {
            console.log('Connecting to MongoDB...', mongo_uri)
            const conn = await mongoose.connect(mongo_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as mongoose.ConnectOptions)
            console.log(`mongodb connected: ${conn.connection.host}`)
        } catch (error) {
            console.error('Connection failed with error:', error)
            process.exit(1)
        }
    }
}

export default Database
