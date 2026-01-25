import { Schema } from 'mongoose'
import { IUserDocument } from '../features/auth/interfaces/authInterface.js'
import bcrypt from 'bcryptjs'

export const UserSchema: Schema<IUserDocument> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        role: {
            type: String,
            enum: ['admin', 'team-leader', 'manager', 'employee', 'cashier'],
            default: 'admin',
        },

        password: {
            type: String,
            required: true,
        },

        businessId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)
//hashing the password
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//comparing the password first
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}
