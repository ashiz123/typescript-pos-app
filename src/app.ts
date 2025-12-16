//express app setup
import express from 'express'
import authRoutes from './features/auth/auth.route.js'
import { errorHandler } from './middlewares/errorHandler.js'
// import { logger } from './middlewares/logHandler.js'

const app = express()

app.use(express.json())
// app.use(logger)

// routes
app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

// middlewares last
app.use(errorHandler)

export default app
