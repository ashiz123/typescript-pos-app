import { Types } from 'mongoose'

export interface BusinessProps {
    name: string
    address: string
    website?: string
    email?: string
    phone?: string
    businessType?: string
}

// export type CreateBusinessDTO  = Omit<>
export interface CreateBusinessDTO extends BusinessProps {
    userId: Types.ObjectId
}

export type UpdateBusinessDTO = Partial<Omit<CreateBusinessDTO, 'userId'>>
