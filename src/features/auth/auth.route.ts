import express from 'express'
import {
    registerUser,
    loginUser,
    getAuthUser,
    logoutUser,
    loginUserWithBusinessId,
} from './auth.controller.js'

import { authHandler } from '../../middlewares/authHandler.js'
import { container } from 'tsyringe'
import { IAuthService } from './interfaces/authInterface.js'
import { TOKENS } from '../../config/tokens.js'
const router = express.Router()
const authService = container.resolve<IAuthService>(TOKENS.AUTH_SERVICE)
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
