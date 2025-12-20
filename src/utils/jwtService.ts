import { type JWTPayload, SignJWT, jwtVerify } from 'jose'
import dotenv from 'dotenv'
import { redisClient } from '../config/redisConnection.js'
dotenv.config()

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

if (!secret) {
    throw new Error('JWT secret is not set')
}

export interface IClaims extends Omit<JWTPayload, 'sub'> {
    sub: string
    email: string
}

// export interface IVerified extends JWTPayload, IClaims {}
// export interface IJWTPackage {token : string; payload : IVerified}

const ISSUER: string = 'my-pos-auth'
const AUDIENCE: string = 'my-pos-api'

export async function signIn(
    data: IClaims,
    ttl: string = '10m'
): Promise<string> {
    return await new SignJWT(data)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime(ttl)
        .sign(secret)
}

export async function verifyToken(token: string) {
    try {
        if ((await redisClient.get(`session:${token}`)) === null) {
            throw new Error('Token is invalid or has expired')
        }

        const { payload } = await jwtVerify<IClaims>(token, secret, {
            algorithms: ['HS256'],
            issuer: ISSUER,
            audience: AUDIENCE,
            clockTolerance: 5,
        })

        return payload
    } catch (err) {
        console.log(err)
    }
}
