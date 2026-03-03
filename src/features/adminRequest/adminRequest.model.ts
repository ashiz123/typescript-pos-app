import mongoose, { Document, Types } from 'mongoose'
import {
    AdminStatus,
    AdminPriority,
    RequestType,
    TargetModel,
} from './adminRequest.type'
import { AdminRequestSchema } from './adminRequest.schema'

export interface AdminRequestType {
    requestedBy: string
    requestType: RequestType
    targetModel: TargetModel
    targetId: string
    status: AdminStatus
    priority: AdminPriority
    note?: string
}

export type CreateAdminRequestType = {
    requestedBy: string
    targetId: string
    note?: string
}

export interface AdminRequestDocument
    extends Omit<AdminRequestType, 'requestedBy' | 'targetId'>, Document {
    requestedBy: Types.ObjectId
    targetId: Types.ObjectId
    deletedAt: Date
    createdAt: Date
    updatedAt: Date
}

export const AdminRequestModel = mongoose.model<AdminRequestDocument>(
    'AdminRequest',
    AdminRequestSchema
)
