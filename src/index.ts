import dotenv from 'dotenv'
import app from './app.js'
import Database from './config/databaseConnection.js'

dotenv.config()

const port = process.env.PORT || 3000
console.log('Environment:', process.env.NODE_ENV)
const db = Database.getInstance()

db.connect().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})
