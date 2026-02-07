import { SignJWT, jwtVerify } from 'jose'
import { getRedisClient } from '../config/redisConnection.js'
import {
    Payload,
    JwtPayload,
} from '../features/auth/interfaces/authInterface.js'
import { PreAuthType } from '../features/auth/types/LoginResponse.type.js'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

if (!secret) {
    throw new Error('JWT secret is not set')
}

// export interface IClaims extends Omit<JWTPayload, 'sub'> {
//     sub: string
//     email: string
// }

export const ISSUER: string = 'my-pos-auth'
export const AUDIENCE: string = 'my-pos-api'

export type SignInType = (
    data: Payload | PreAuthType,
    ttl?: string
) => Promise<string>
export const signIn: SignInType = async (data, ttl = '10m') => {
    return await new SignJWT(data)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime(ttl)
        .sign(secret)
}

export async function verifyToken(token: string): Promise<JwtPayload> {
    const { payload } = await jwtVerify<JwtPayload>(token, secret, {
        algorithms: ['HS256'],
        issuer: ISSUER,
        audience: AUDIENCE,
        clockTolerance: 5,
    })

    if (payload.type !== 'preAuth') {
        const redisClient = getRedisClient()
        if ((await redisClient.get(`session:${token}`)) === null) {
            throw new Error('Token is invalid or has expired')
        }
    }

    return payload
}
