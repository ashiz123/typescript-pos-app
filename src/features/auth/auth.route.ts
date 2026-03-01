import express from 'express'
import {
    registerUser,
    loginUser,
    getAuthUser,
    logoutUser,
    loginUserWithBusinessId,
} from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { AuthRepository } from './auth.repository.js'
import { getRedisClient } from '../../config/redisConnection.js'
import { authHandler } from '../../middlewares/authHandler.js'
import { comparePassword } from '../../utils/password.js'
import { userBusinessRepository } from '../userBusiness/userBusiness.repository.js'
import { redisConnect } from '../../config/ioRedisConnection.js'
// const redisClient = getRedisClient()
const router = express.Router()
const authRepository = new AuthRepository()
export const authService = new AuthService(
    authRepository,
    comparePassword,
    redisConnect,
    userBusinessRepository
)
router.post('/register', registerUser(authService))
router.post('/login', loginUser(authService))
router.post(
    '/loginWithBusiness',
    authHandler,
    loginUserWithBusinessId(authService)
)
router.get('/auth_user', authHandler, getAuthUser())
router.post('/logout', authHandler, logoutUser(authService))

export default router
