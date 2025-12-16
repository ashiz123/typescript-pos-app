import express from 'express'
import {
    registerUser,
    loginUser,
    getAuthUser,
    logoutUser,
} from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { AuthRepository } from './auth.repository.js'
import { authHandler } from '../../middlewares/authHandler.js'

const router = express.Router()
const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)

router.post('/register', registerUser(authService))
router.post('/login', loginUser(authService))
router.get('/auth_user', authHandler, getAuthUser())
router.post('/logout', authHandler, logoutUser(authService))

export default router
