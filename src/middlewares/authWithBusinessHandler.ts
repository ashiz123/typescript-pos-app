import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwtService'
import { logger } from './logHandler'

export const authWithBusinessHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        res.status(401).json({ message: 'User not authorized, Token required' })
        return
    }

    const token = authHeader.split(' ')[1]
    if (!token) throw new Error('No token provided')

    try {
        const payload = await verifyToken(token)

        if (!payload) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }

        req.user = {
            userId: payload.sub,
            email: payload.email,
            type: payload.type,
            status: payload.status,
            businessId: payload.businessId,
            role: payload.role,
        }

        next()
    } catch (error) {
        logger.info(error)
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
}
