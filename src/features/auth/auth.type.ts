import { AUTH_TYPE, USER_ROLE } from './user.constant'

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]

export type AuthType = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE]
