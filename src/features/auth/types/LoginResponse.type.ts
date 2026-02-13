import { IUserBusinessDocument } from '../../userBusiness/interfaces/userBusiness.interface'
export type LoginResponse = {
    // id?: Types.ObjectId
    email: string
    token: string
}

export type UserBusiness = {
    businessId: string
    role: string
    userStatus: 'pending' | 'active' | 'disabled'
}

export type LoginFirstResponse = {
    token: string
    businesses: UserBusiness[]
}

export type PreAuthType = {
    sub: string
    email: string
    type: string
}

export type LoginWithSelectBusinessDTO = {
    userId: string
    email: string
    type?: string
    businessId: string
}
