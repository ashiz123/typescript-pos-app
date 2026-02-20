type Payment = {
    id: string
    amount: number
    currency: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export interface IPaymentController {
    createPayment(payment: Payment): Promise<Payment>
    getPaymentById(id: string): Promise<Payment>
    updatePayment(id: string, payment: Payment): Promise<Payment>
    deletePayment(id: string): Promise<void>
}
