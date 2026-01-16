import mongoose, { Model, Document, Types } from 'mongoose'
import { CategorySchema } from './categories_schema.js'
import { ICategory } from '../features/category/category.model.js'

export interface ICategoryDocument
    extends Omit<ICategory, 'businessId' | 'parentCategoryId'>, Document {
    _id: Types.ObjectId
    businessId: Types.ObjectId
    parentCategoryId?: Types.ObjectId | null
}

export const CategoryModel: Model<ICategoryDocument> =
    mongoose.model<ICategoryDocument>('Category', CategorySchema)
