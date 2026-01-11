import mongoose, { Model } from 'mongoose'
import { IUser } from './interfaces/authInterface.js'
import { UserSchema } from '../../database/user_schema.js'

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export default User
