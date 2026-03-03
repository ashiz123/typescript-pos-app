import { ClientSession } from 'mongoose'
import {
    ADMIN_PRIORITY,
    ADMIN_STATUS,
    REQUEST_TYPE,
    TARGET_MODEL,
} from './adminRequest.constant'
import {
    AdminRequestDocument,
    CreateAdminRequestType,
} from './adminRequest.model'

export type AdminStatus = (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS]
export type AdminPriority = (typeof ADMIN_PRIORITY)[keyof typeof ADMIN_PRIORITY]
export type RequestType = (typeof REQUEST_TYPE)[keyof typeof REQUEST_TYPE]
export type TargetModel = (typeof TARGET_MODEL)[keyof typeof TARGET_MODEL]

export interface IAdminRequestRepository {
    createWithSession(
        data: CreateAdminRequestType,
        session: ClientSession
    ): Promise<AdminRequestDocument>
}

export interface IAdminRequestService {
    createWithSession(
        data: CreateAdminRequestType,
        session: ClientSession
    ): Promise<AdminRequestDocument>
}
