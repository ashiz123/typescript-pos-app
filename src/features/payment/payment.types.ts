import { ClientSession } from 'mongodb'
import { IPaymentDocument, PaymentType } from './payment.model'

export interface IPaymentController {
    createPayment(payment: PaymentType): Promise<PaymentType>
    getPaymentById(id: string): Promise<PaymentType>
    updatePayment(id: string, payment: PaymentType): Promise<PaymentType>
    deletePayment(id: string): Promise<void>
}

export interface IPaymentRepository {
    create(data: PaymentType, session: ClientSession): Promise<IPaymentDocument>
    // findById(paymentId: string): Promise<PaymentType | null>
    // findByOrderId(orderId: string): Promise<PaymentType | null>
    // updateStatus(paymentId: string, status: PaymentStatus): Promise<PaymentType>
    // delete(paymentId: string): Promise<void>
}

export interface IPaymentService {
    createPayment(
        data: PaymentType,
        session: ClientSession
    ): Promise<IPaymentDocument>
}

// getPaymentByOrder(orderId: string): Promise<PaymentType>
// updatePaymentStatus(
//     orderId: string,
//     status: PaymentStatus
// ): Promise<PaymentType>
// refundPayment(orderId: string, amount?: number): Promise<PaymentType>

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

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS]
