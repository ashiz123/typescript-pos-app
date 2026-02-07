export type Roles = 'owner' | 'manager' | 'cashier' | 'admin'

const CASHIER_PERMISSIONS = [
    'view_products',
    'create_order',
    'scan_items',
] as const

const MANAGER_PERMISSIONS = [
    ...CASHIER_PERMISSIONS,
    'add_product',
    'remove_product',
    'edit_product',
    'view_sales_reports',
] as const

const OWNER_PERMISSIONS = [
    ...MANAGER_PERMISSIONS,
    'manage_users',
    'manage_business',
    'create_business',
    'edit_settings',
    'view_reports',
] as const

const ADMIN_PERMISSIONS = [
    ...OWNER_PERMISSIONS,
    'update_owner',
    'remove_owner',
    'accept_owner',
    'accept_business',
    'review_app_report',
    'review_owner_report',
] as const

export const ROLE_PERMISSIONS: Record<Roles, readonly string[]> = {
    cashier: CASHIER_PERMISSIONS,
    manager: MANAGER_PERMISSIONS,
    owner: OWNER_PERMISSIONS,
    admin: ADMIN_PERMISSIONS,
}
