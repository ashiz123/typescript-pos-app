export type Roles = 'admin' | 'manager' | 'cashier'

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

const ADMIN_PERMISSIONS = [
    ...MANAGER_PERMISSIONS,
    'manage_users',
    'update_business',
    'edit_settings',
    'view_reports',
] as const

export const ROLE_PERMISSIONS: Record<Roles, readonly string[]> = {
    cashier: CASHIER_PERMISSIONS,
    manager: MANAGER_PERMISSIONS,
    admin: ADMIN_PERMISSIONS,
}
