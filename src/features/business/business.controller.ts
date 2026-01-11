import { Request, Response, NextFunction } from 'express'
import { ICrudService } from '../../shared/baseService'
import { BusinessProps } from './business.model'
import { businessService } from './business.service'
import { ICrudController } from '../../shared/crudControllerInterface'
import { ApiResponse } from '../../types/apiResponseType'
import {
    BusinessSchema,
    type BusinessRequest,
} from '../auth/validations/BusinessSchemaValidation'
import { NotFoundError } from '../../errors/httpErrors'

class BusinessController implements ICrudController {
    private readonly businessService: ICrudService<BusinessProps>

    constructor(businessService: ICrudService<BusinessProps>) {
        this.businessService = businessService
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user?.userId) {
                throw new Error('Loggedin user not found')
            }
            const data: BusinessRequest = BusinessSchema.parse(req.body) //validation
            const businessDataWithUser = { ...data, userId: req.user.userId }
            const newBusiness: BusinessProps =
                await this.businessService.create(businessDataWithUser)
            const response: ApiResponse<BusinessProps> = {
                success: true,
                data: newBusiness,
                message: 'Business created successfully',
            }
            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allBusiness = await this.businessService.getAll()
            const response: ApiResponse<BusinessProps[]> = {
                success: true,
                data: allBusiness,
            }
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const businessId: string = req.params.id
            const business = await this.businessService.getById(businessId)
            if (!business) {
                throw new NotFoundError('Business not found')
            }
            const response: ApiResponse<BusinessProps> = {
                success: true,
                data: business,
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const businssId: string = req.params.id
            const updatedData: Partial<BusinessRequest> = req.body
            const updatedBusiness = await this.businessService.update(
                businssId,
                updatedData
            )
            if (!updatedBusiness) {
                throw new Error('Business is not updated')
            }

            const response: ApiResponse<BusinessProps> = {
                success: true,
                data: updatedBusiness,
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const businessId: string = req.params.id
            const deletedBusiness =
                await this.businessService.delete(businessId)
            if (!deletedBusiness) {
                throw new Error('Business can not deleted')
            }
            const response: ApiResponse<BusinessProps> = {
                success: true,
                message: 'Business deleted successfully',
            }
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

export const businessController = new BusinessController(businessService)
