import { CrudRepository, ICrudRepository } from '../../shared/crudRepository'
import {
    CreateProductDTO,
    IProduct,
    IProductDocument,
    ProductModel,
    UpdateProductDTO,
} from './product.model'

export interface IProductRepository extends ICrudRepository<
    IProductDocument,
    CreateProductDTO,
    UpdateProductDTO
> {
    filterProductByCategoryId(categoryId: string): Promise<IProduct[]>
    filterProductByDateRange(fromDate: Date, toDate: Date): Promise<IProduct[]>
    // discountedProduct(): Promise<IProduct[]>
    // mostLikedProduct(): Promise<IProduct | null>
    // mostViewedProduct(): Promise<IProduct | null>
    // mostRatingProduct(): Promise<IProduct | null>
}

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
}

export const productRepository = new ProductRepository()
