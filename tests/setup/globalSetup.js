import dotenv from 'dotenv'
import path from 'path'
//this connect to .env.test ,

export default async function globalSetup() {
    dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })
    console.log('Global setup running...', process.env.REDIS_URL)
}
