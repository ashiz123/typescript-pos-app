import { ICrudService } from '../../shared/baseService'
import {
    CreateProductDTO,
    IProduct,
    IProductDocument,
    UpdateProductDTO,
} from './product.model'
import { IProductRepository, productRepository } from './product.repository'

export interface IProductService extends ICrudService<IProduct> {
    getProductsByCategory(categoryId: string): Promise<IProduct[] | null>
    getProductByDateRange(
        fromDate: Date,
        toDate: Date
    ): Promise<IProduct[] | null>
}

export class ProductService implements IProductService {
    private repo: IProductRepository

    constructor(repo: IProductRepository) {
        this.repo = repo
    }

    getById = async (productId: string): Promise<IProductDocument | null> => {
        return this.repo.findById(productId)
    }

    getAll = async (): Promise<IProductDocument[]> => {
        return this.repo.findAll()
    }

    create = async (data: CreateProductDTO): Promise<IProductDocument> => {
        return this.repo.create(data)
    }

    update = async (
        id: string,
        data: UpdateProductDTO
    ): Promise<IProductDocument | null> => {
        return this.repo.update(id, data)
    }

    delete = async (id: string): Promise<boolean> => {
        return this.repo.delete(id)
    }

    getProductsByCategory = async (
        categoryId: string
    ): Promise<IProduct[] | null> => {
        return this.repo.filterProductByCategoryId(categoryId)
    }

    getProductByDateRange = async (
        fromDate: Date,
        toDate: Date
    ): Promise<IProduct[] | null> => {
        return this.repo.filterProductByDateRange(fromDate, toDate)
    }
}

export const productService = new ProductService(productRepository)
