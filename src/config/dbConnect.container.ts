import { container } from 'tsyringe'
import mongoose from 'mongoose'
import Database from './databaseConnection.js'
import { TOKENS } from './tokens.js'

await Database.getInstance().connect()

container.registerInstance(TOKENS.DATABASE_CONNECTION, mongoose.connection)
