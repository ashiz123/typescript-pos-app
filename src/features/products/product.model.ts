import mongoose, { Document, Model, Types } from 'mongoose'
import { ProductSchema } from './product.schema'

export interface IProduct {
    sku: string
    name: string
    description?: string
    price: number
    costPrice: number // To calculate profit margins
    stockQuantity: number
    isActive: boolean
}

export interface CreateProductDTO extends IProduct {
    //create with string categoryId
    categoryId: string
}

export type UpdateProductDTO = Partial<Omit<CreateProductDTO, 'categoryId'>> //the categoryId in product is not editable.

export interface IProductDocument //database take these data as well
    extends Omit<IProduct, 'categoryId'>, Document {
    _id: Types.ObjectId
    categoryId: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export const ProductModel: Model<IProductDocument> =
    mongoose.model<IProductDocument>('Product', ProductSchema)
