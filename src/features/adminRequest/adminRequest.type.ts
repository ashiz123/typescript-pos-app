import {
    ADMIN_PRIORITY,
    ADMIN_STATUS,
    REQUEST_TYPE,
} from './adminRequest.constant'
import {
    AdminRequestDocument,
    CreateAdminRequestType,
} from './adminRequest.model'

export type AdminStatus = (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS]
export type AdminPriority = (typeof ADMIN_PRIORITY)[keyof typeof ADMIN_PRIORITY]
export type RequestType = (typeof REQUEST_TYPE)[keyof typeof REQUEST_TYPE]

export interface IAdminRequestRepository {
    create(data: CreateAdminRequestType): Promise<AdminRequestDocument>
}
