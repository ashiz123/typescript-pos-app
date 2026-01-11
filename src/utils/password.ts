import bcrypt from 'bcryptjs'

export type ComparePasswordFn = (
    password: string,
    hashedPassword: string
) => Promise<boolean>

export const comparePassword: ComparePasswordFn = async (
    password,
    hashedPassword
) => {
    return await bcrypt.compare(password, hashedPassword)
}
