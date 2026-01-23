import { Request, Response, NextFunction } from 'express'
import { ICrudController } from '../../shared/crudControllerInterface'
import { IProductService, productService } from './product.service'
import {
    CreateProductSchema,
    ProductRequest,
    ProductUpdate,
    UpdateProductSchema,
} from './validations/createProduct.validation'
import { ApiResponse } from '../../types/apiResponseType'
import { IProduct } from './product.model'

export class ProductController implements ICrudController {
    private productService: IProductService

    constructor(productService: IProductService) {
        this.productService = productService
    }

    list = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const productsData = await this.productService.getAll()
            const response: ApiResponse<IProduct[]> = {
                success: true,
                data: productsData,
            }
            res.status(200).json(response)
            return
        } catch (err) {
            next(err)
        }
    }

    getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params
            const product = await this.productService.getById(id)
            const response: ApiResponse<IProduct | null> = {
                success: true,
                data: product,
            }
            res.status(200).json(response)
            return
        } catch (err) {
            next(err)
        }
    }

    create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const data: ProductRequest = CreateProductSchema.parse(req.body)
            const newProduct = await this.productService.create(data)
            const response: ApiResponse<IProduct> = {
                success: true,
                data: newProduct,
                message: 'Product created successfully',
            }

            res.status(201).json(response)
            return
        } catch (err) {
            next(err)
        }
    }

    update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params

            const validatedData: ProductUpdate = UpdateProductSchema.parse(
                req.body
            )
            const updatedProduct = await this.productService.update(
                id,
                validatedData
            )
            const response: ApiResponse<IProduct | null> = {
                success: true,
                data: updatedProduct,
                message: 'Product updated successfully',
            }

            res.status(200).json(response)
            return
        } catch (err) {
            next(err)
        }
    }

    remove = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id: string = req.params.id
            const deletedBusiness = await this.productService.delete(id)
            if (!deletedBusiness) {
                throw new Error('Product can not deleted')
            }
            const response: ApiResponse<object> = {
                success: true,
                data: {},
                message: 'Product deleted successfully',
            }
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    filterByCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params
            const productByCategory =
                await this.productService.getProductsByCategory(id)
            const response: ApiResponse<IProduct[] | null> = {
                success: true,
                data: productByCategory,
            }
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

export const productController = new ProductController(productService)
