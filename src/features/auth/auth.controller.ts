import { Request, Response, NextFunction } from 'express'
import { type IAuthService } from './interfaces/authInterface.js'
import { RegisterSchemaValidation } from './validations/RegisterSchemaValidation.js'
import { LoginSchemaValidation } from './validations/LoginSchemaValidation.js'
import { logger } from '../../middlewares/logHandler.js'

export const registerUser =
    (authService: IAuthService) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = RegisterSchemaValidation.parse(req.body)
            // const { name, email, phone, password } = data
            const result = await authService.register(data)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

export const loginUser =
    (authService: IAuthService) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = LoginSchemaValidation.parse(req.body)
            const { email, password } = data
            const result = await authService.login(email, password)
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: result,
            })
        } catch (err) {
            next(err)
        }
    }

export const getAuthUser =
    () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loggedInUser = await req.user
            res.status(200).json({ loggedInUser })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

export const logoutUser =
    (authService: IAuthService) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.headers.authorization?.split(' ')[1] || ''
        const result = await authService.logout(token)
        if (!result) {
            logger.error('Logout user failed')
            return next(new Error('Logout failed'))
        }

        res.status(200).json({ message: 'User logged out successfully' })
    }
