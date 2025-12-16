import mongoose, {Model} from 'mongoose';
import { IUser } from './interfaces/IUserProps.interface.js';
import {UserSchema} from '../../database/user_schema.js';

const User: Model<IUser> = mongoose.model<IUser>('user', UserSchema);
export default User;