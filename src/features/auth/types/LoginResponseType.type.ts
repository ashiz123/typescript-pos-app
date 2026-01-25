import { Types } from 'mongoose'

export type LoginResponseType = {
    id?: Types.ObjectId
    email: string
    token: string
}
