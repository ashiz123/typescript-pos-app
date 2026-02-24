export const PAYMENT_STATUS = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUNDED: 'partial_refunded',
    EXPIRED: 'expired',
    REVERSED: 'reversed',
    REVERSED_FAILED: 'reversed_failed',
    REVERSED_SUCCESS: 'reversed_success',
} as const

export const PAYMENT_TYPE = {
    CARD: 'card',
    PAYPAL: 'paypal',
    BANK_TRANSFER: 'bank_transfer',
    CASH: 'cash',
    OTHER: 'other',
} as const
