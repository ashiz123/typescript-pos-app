import { Schema } from 'mongoose'
import { IBusinessDocument } from './business_db_model'

export const businessSchema = new Schema<IBusinessDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        website: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        phone: {
            type: String,
            trime: true,
        },

        businessType: {
            type: String,
            trim: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
)
