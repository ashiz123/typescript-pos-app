//status : active | inactive | pending
export interface BusinessProps {
    name: string
    address: string
    status: 'pending' | 'active' | 'disabled'
    activationToken?: string
    website?: string
    email?: string
    phone?: string
    businessType?: string
}

export interface CreateBusinessDTO {
    name: string
    address: string
    activationToken?: string
    website?: string
    email?: string
    phone?: string
    businessType?: string
}

export type UpdateBusinessDTO = Partial<Omit<CreateBusinessDTO, 'userId'>>
