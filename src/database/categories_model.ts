import mongoose, { Model, Document, Types } from 'mongoose'
import { CategorySchema } from './categories_schema.js'
import { ICategory } from '../features/category/category.model.js'

//Mongoose persistence model for Categories

// export interface ICategory {
//     businessId: Types.ObjectId
//     title: string
//     description?: string
//     isActive: boolean
//     parentCategoryId?: Types.ObjectId
//     deletedAt?: Date | null
//     createdAt?: Date
//     updatedAt?: Date
// }
//
//

//Doing type narrowing
// export interface ICategory {
//     businessId: string | Types.ObjectId
//     title: string
//     description?: string
//     isActive: boolean
//     parentCategoryId?: string | Types.ObjectId | null
//     deletedAt?: Date | null
//     createdAt?: Date
//     updatedAt?: Date
// }

export interface ICategoryDocument
    extends Omit<ICategory, 'businessId' | 'parentCategoryId'>, Document {
    _id: Types.ObjectId
    businessId: Types.ObjectId
    parentCategoryId?: Types.ObjectId | null
}

export const CategoryModel: Model<ICategoryDocument> =
    mongoose.model<ICategoryDocument>('Category', CategorySchema)
