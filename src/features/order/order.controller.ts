import { inject, injectable } from 'tsyringe'
import { IOrderController, IOrderService } from './order.type'
import { Request, Response, NextFunction } from 'express'
import { TOKENS } from '../../config/tokens'
import { OrderCreateValidation } from './order.validation'
import { PaymentValidationSchema } from '../payment/payment.validation'
import { ApiResponse } from '../../types/apiResponseType'
import { OrderType } from './order.model'
import { NotFoundError, UnauthorizedError } from '../../errors/httpErrors'
import { AUTH_TYPE } from '../auth/user.constant'
import { IPaymentIntentDTO } from '../stripe/stripePayment.type'

@injectable()
export class OrderController implements IOrderController {
    constructor(
        @inject(TOKENS.ORDER_SERVICE) private orderService: IOrderService
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new NotFoundError('User not found to create the user')
            }

            const { type, businessId, terminalId, userId, terminalSessionId } =
                req.user

            if (
                type !== AUTH_TYPE.TERMINAL_ACCESS ||
                !businessId ||
                !terminalId
            ) {
                throw new UnauthorizedError('User UnauthorizedError')
            }

            const parsedValidatedData = OrderCreateValidation.parse(req.body)
            const paymentToVerify = await this.orderService.createOrder(
                userId,
                businessId,
                terminalId,
                terminalSessionId,
                parsedValidatedData.items
            )

            const response: ApiResponse<IPaymentIntentDTO> = {
                success: true,
                data: paymentToVerify,
                message: 'Order processing',
            }

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    completeOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('req.user', req.user)

            // const parsedValidatedPayment = PaymentValidationSchema.parse(
            //     req.body
            // )

            // const order = await this.orderService.completeOrder(
            //     parsedValidatedPayment
            // )

            // console.log(order)

            // const response: ApiResponse<OrderType> = {
            //     success: true,
            //     data: order,
            //     message: 'Order completed successfully',
            // }

            res.status(200).json(
                'Route is not working currently, instead working through stripe webhook'
            )
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
        const { orderId } = req.body
        await this.orderService.cancelOrder(orderId)
        const response: ApiResponse<OrderType> = {
            success: true,
            message: 'Order cancelled succesfully',
        }

        res.status(200).json(response)
        return
    }
}
