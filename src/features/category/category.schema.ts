import { Schema } from 'mongoose'
import { ICategoryDocument } from './category.model'

export const CategorySchema = new Schema<ICategoryDocument>(
    {
        businessId: {
            type: Schema.Types.ObjectId,
            required: [true, 'Business id is required'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Business name is required'],
            trim: true,
        },
        description: {
            type: String,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
        parentCategoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: false,
            default: null,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true, id: true }
)
