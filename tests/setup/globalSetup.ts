import { config } from 'dotenv'
import path from 'node:path'

export async function setup() {
    config({ path: path.resolve(process.cwd(), '.env.test') })
}
