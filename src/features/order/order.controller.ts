import { inject, injectable } from 'tsyringe'
import { IOrderController, IOrderService } from './order.type'
import { Request, Response, NextFunction } from 'express'
import { TOKENS } from '../../config/tokens'
import { OrderCreateValidation } from './order.validation'
import { PaymentValidationSchema } from '../payment/payment.validation'

@injectable()
export class OrderController implements IOrderController {
    constructor(
        @inject(TOKENS.ORDER_SERVICE) private orderService: IOrderService
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedValidatedData = OrderCreateValidation.parse(req.body)
            const orderData = await this.orderService.createOrder(
                parsedValidatedData.items
            )

            if (!orderData || !orderData.total) {
                throw new Error('Order creation failed or total is missing')
            }

            // const stripeAmount = Math.round(orderData.total * 100)

            // const paymentIntent = await createPaymentIntent(stripeAmount, 'gbp')

            // if (!paymentIntent) {
            //     throw new Error('Stripe Payment Intent creation failed')
            // }

            const response = {
                success: true,
                data: {
                    order: orderData,
                    amount: orderData.total,
                    // clientSecret: paymentIntent.client_secret,
                    // paymentIntentId: paymentIntent.id,
                },
                message: 'Ready to complete the order',
            }

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    completeOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedValidatedPayment = PaymentValidationSchema.parse(
                req.body
            )

            const response = this.orderService.completeOrder(
                parsedValidatedPayment
            )

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        return
    }

    update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        return
    }

    remove = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        return
    }

    list = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        return
    }

    refundOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        return
    }

    cancelOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        return
    }
}
