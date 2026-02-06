import mongoose, { Model } from 'mongoose'
import { IUserDocument } from './interfaces/authInterface.js'
import { UserSchema } from '../../database/user_schema.js'

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
    'User',
    UserSchema
)

export default UserModel
