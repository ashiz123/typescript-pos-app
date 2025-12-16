import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwtService.js'
import { logger } from './logHandler.js'

export const authHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //validation

    const authHeader = req.headers['authorization']
    if (!authHeader)
        return res
            .status(401)
            .json({ message: 'User not authorized, Token required' })

    const token = authHeader.split(' ')[1]

    try {
        const decoded = await verifyToken(token)
        if (!decoded) {
            logger.error('Invalid token')
            return res.status(401).json({ message: 'Invalid token' })
        }

        req.user = {
            userId: decoded.sub,
            email: decoded.email,
        }

        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}
