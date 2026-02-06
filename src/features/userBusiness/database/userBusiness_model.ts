import { model, Model, Types } from 'mongoose'
import { UserBusinessSchema } from './userBusiness_schema.js'
import {
    IUserBusinessDocument,
    IUserBusinessModel,
    IUserBusinessProps,
} from '../interfaces/userBusinessInterface.js'

// Extend the Model to include static methods
interface UserBusinessModel extends Model<
    IUserBusinessDocument,
    object,
    IUserBusinessModel
> {
    findActiveByUserId(userId: Types.ObjectId): Promise<IUserBusinessDocument[]>
    findByBusinessAndRole(
        businessId: Types.ObjectId,
        role: string,
        activeOnly?: boolean
    ): Promise<IUserBusinessDocument[]>
    findBusinessesByUserId(
        userId: Types.ObjectId
    ): Promise<IUserBusinessDocument[]>
    findUsersByBusinessId(
        businessId: Types.ObjectId
    ): Promise<IUserBusinessDocument[]>
}

// Create and export the model
export const UserBusinessModel = model<
    IUserBusinessDocument,
    UserBusinessModel
>('UserBusiness', UserBusinessSchema)

// Type exports for convenience
export type { IUserBusinessDocument, IUserBusinessProps }
