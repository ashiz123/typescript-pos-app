import { Schema, Types } from 'mongoose'
import { IUserBusinessDocument } from '../interfaces/userBusiness.interface'

export const UserBusinessSchema: Schema<IUserBusinessDocument> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true,
        },

        businessId: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            required: [true, 'Business ID is required'],
            index: true,
        },

        role: {
            type: String,
            enum: [
                'owner',
                'admin',
                'manager',
                'cashier',
                'accountant',
                'employee',
                'viewer',
            ],
            required: [true, 'Role is required'],
            default: 'employee',
        },

        userStatus: {
            type: String,
            required: true,
            default: 'pending',
        },

        startDate: {
            type: Date,
            required: false,
            default: Date.now,
        },

        endDate: {
            type: Date,
            required: false,
            default: null,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 500,
            required: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

// Compound index to ensure a user can only have one role per business
UserBusinessSchema.index(
    { userId: 1, businessId: 1 },
    { unique: true, name: 'user_business_unique' }
)

// Index for active user-business relationships
UserBusinessSchema.index(
    { businessId: 1, userStatus: 1 },
    { name: 'active_business_users' }
)

// Index for role-based queries
UserBusinessSchema.index(
    { userId: 1, businessId: 1 },
    {
        partialFilterExpression: { userStatus: 'active' },
        name: 'check_owner_active',
    }
)

// Virtual populate for user
UserBusinessSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
})

// Virtual populate for business
UserBusinessSchema.virtual('business', {
    ref: 'Business',
    localField: 'businessId',
    foreignField: '_id',
    justOne: true,
})

// Method to check if user has specific permission
// UserBusinessSchema.methods.hasPermission = function (
//     permission: string
// ): boolean {
//     return this.permissions.includes(permission)
// }

// Method to check if user has any of the given permissions
// UserBusinessSchema.methods.hasAnyPermission = function (
//     permissions: string[]
// ): boolean {
//     return permissions.some((permission) =>
//         this.permissions.includes(permission)
//     )
// }

// Method to check if user has all of the given permissions
// UserBusinessSchema.methods.hasAllPermissions = function (
//     permissions: string[]
// ): boolean {
//     return permissions.every((permission) =>
//         this.permissions.includes(permission)
//     )
// }

// Static method to find active user-business relationships
// UserBusinessSchema.statics.findActiveByUserId = function (
//     userId: Types.ObjectId
// ) {
//     return this.find({ userId, isActive: true }).populate('business')
// }

// Static method to find users by business and role
UserBusinessSchema.statics.findByBusinessAndRole = function (
    businessId: Types.ObjectId,
    role: string,
    activeOnly: boolean = true
) {
    const query: {
        businessId: Types.ObjectId
        role: string
        isActive?: boolean
    } = { businessId, role }
    if (activeOnly) {
        query.isActive = true
    }
    return this.find(query).populate('user')
}

// Static method to find all businesses a user has access to
UserBusinessSchema.statics.findBusinessesByUserId = function (
    userId: Types.ObjectId
) {
    return this.find({ userId, isActive: true })
        .populate('business')
        .select('business role permissions')
}

// Static method to find all users in a business
UserBusinessSchema.statics.findUsersByBusinessId = function (
    businessId: Types.ObjectId
) {
    return this.find({ businessId, isActive: true })
        .populate('user')
        .select('user role permissions department')
}
