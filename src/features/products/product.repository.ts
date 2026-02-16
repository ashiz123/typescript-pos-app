import { injectable } from 'tsyringe'
import { CrudRepository } from '../../shared/crudRepository'
import {
    CreateProductDTO,
    IProduct,
    IProductDocument,
    ProductModel,
    UpdateProductDTO,
} from './product.model'
import { IProductRepository } from './product.type'

@injectable()
export class ProductRepository
    extends CrudRepository<IProductDocument, CreateProductDTO, UpdateProductDTO>
    implements IProductRepository
{
    constructor() {
        super(ProductModel)
    }

    filterProductByCategoryId(categoryId: string): Promise<IProduct[]> {
        return this.model.find({ categoryId: categoryId })
    }

    filterProductByDateRange(
        fromDate: Date,
        toDate: Date
    ): Promise<IProduct[]> {
        return this.model
            .find({
                createdAt: {
                    $gte: fromDate,
                    $lte: toDate,
                },
            })
            .lean()
            .sort({ createdAt: -1 })
            .exec()
    }

    getProductByBusinessId(businessId: string): Promise<IProduct[]> {
        return this.model
            .find({ businessId: businessId })
            .lean()
            .sort({ createdAt: -1 })
            .exec()
    }

    generateSKU(prefix: string = 'SKU'): string {
        const timestamp = Date.now().toString(36) // shorter
        const random = Math.random().toString(36).substring(2, 6).toUpperCase()
        return `${prefix}-${timestamp}-${random}`
    }
}

export const productRepository = new ProductRepository()
