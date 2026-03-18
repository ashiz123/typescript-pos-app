import mongoose from 'mongoose'
import { IAuthCodeDocument } from './authCode.type'

export const AuthCodeSchema = new mongoose.Schema<IAuthCodeDocument>(
    {
        email: { type: String, required: true },
        code: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
)

export const AuthCodeModel = mongoose.model<IAuthCodeDocument>(
    'AuthCode',
    AuthCodeSchema
)
