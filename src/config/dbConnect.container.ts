import { container } from 'tsyringe'
import { TOKENS } from './tokens.js'
import mongoose from 'mongoose'
import Database from './databaseConnection.js'

container.register(TOKENS.DATABASE_CONNECTION, {
    useFactory: () => mongoose.connection,
})

const db = container.resolve(Database)
await db.connect()

console.log('db container is connected and ready')
