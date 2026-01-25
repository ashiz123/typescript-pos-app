import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwtService.js'

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
    if (!token) throw new Error('No token provided')

    try {
        const payload = await verifyToken(token)
        req.user = {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'Invalid or expired token' })
        return
    }
}
