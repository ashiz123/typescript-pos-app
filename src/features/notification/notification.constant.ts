export const NOTIFICATION_PRIORITY = {
    URGENT: 'urgent',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
}

export const NOTIFICATION_TYPE = {
    STOCK_ALERT: 'stock_alert', //to owner
    TERMINAL_CREATE: 'terminal_create', //to admin
    PAYMENT_DOWN: 'payment_down', //to admin
    BUSINESS_CREATION: 'business_creation', //to admin
    SERVER_DOWN: 'server_down', //to admin and user
}

export const ENTITY_TYPE = {
    TERMINAL: 'terminal',
    ORDER: 'order',
    BUSINESS: 'business',
    PAYMENT: 'payment',
    USER: 'user',
}
