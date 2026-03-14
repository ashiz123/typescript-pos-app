import { USER_ROLE } from './user.constant'

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]
