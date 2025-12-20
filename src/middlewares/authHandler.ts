import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwtService.js'
import { logger } from './logHandler.js'
import { redisClient } from '../config/redisConnection.js'

export const authHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    //validation

    const authHeader = req.headers['authorization']
    if (!authHeader) {
        res.status(401).json({ message: 'User not authorized, Token required' })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = await verifyToken(token)
        if (!decoded) {
            logger.error('Invalid token')
            res.status(401).json({ message: 'Invalid token' })
            return
        }

        req.user = {
            userId: decoded.sub,
            email: decoded.email,
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'Invalid or expired token' })
        return
    }
}
