import express from 'express'
import {
    registerUser,
    loginUser,
    getAuthUser,
    logoutUser,
} from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { AuthRepository } from './auth.repository.js'
import { getRedisClient } from '../../config/redisConnection.js'
import { authHandler } from '../../middlewares/authHandler.js'
import { comparePassword } from '../../utils/password.js'
const redisClient = getRedisClient()
const router = express.Router()
const authRepository = new AuthRepository()
export const authService = new AuthService(
    authRepository,
    comparePassword,
    redisClient
)
router.post('/register', registerUser(authService))
router.post('/login', loginUser(authService))
router.get('/auth_user', authHandler, getAuthUser())
router.post('/logout', authHandler, logoutUser(authService))

export default router
