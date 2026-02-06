import crypto from 'crypto'

export const createToken = () => {
    const token = crypto.randomBytes(32).toString('hex')
    return token
}

export const hashToken = (token: string) => {
    const hashToken = crypto.createHash('sha256').update(token).digest('hex')
    return hashToken
}
