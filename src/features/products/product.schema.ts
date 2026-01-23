import { Schema } from 'mongoose'
import { IProductDocument } from './product.model'

export const ProductSchema: Schema<IProductDocument> = new Schema(
    {
        sku: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            uppercase: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        costPrice: {
            type: Number,
            required: true,
        },
        stockQuantity: {
            type: Number,
            required: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            reference: 'Category',
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, id: true }
)
