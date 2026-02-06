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

//this id different hashing than sha256 used for token hashing. it generate differnt hash everytime hashed
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
