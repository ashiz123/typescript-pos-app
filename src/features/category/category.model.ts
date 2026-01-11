import { Types } from 'mongoose'

export interface ICategory {
    businessId: string | Types.ObjectId
    title: string
    description?: string
    isActive: boolean
    parentCategoryId?: string | Types.ObjectId | null
    deletedAt?: Date | null
    createdAt?: Date
    updatedAt?: Date
}

export type CreateCategoryDTO = Omit<ICategory, 'createdAt' | 'updatedAt'>
export type UpdateCategoryDTO = Partial<Omit<CreateCategoryDTO, 'businessId'>>
