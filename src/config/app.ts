//express app setup
import express from 'express'
import authRoutes from '../features/auth/auth.route.js'
import categoryRoutes from '../features/category/category.route.js'
import businessRoutes from '../features/business/business.route.js'
import { errorHandler } from '../middlewares/errorHandler.js'

const app = express()

app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/business', businessRoutes)
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ status: 'ok' })
// })

// middlewares at last after routes
app.use(errorHandler)

export default app
