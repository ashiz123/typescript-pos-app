import { container } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { ProductRepository } from './product.repository'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import {
    IProductService,
    IProductController,
    IProductRepository,
} from './product.type'

container.registerSingleton<IProductRepository>(
    TOKENS.PRODUCT_REPOSITORY,
    ProductRepository
)

container.registerSingleton<IProductService>(
    TOKENS.PRODUCT_SERVICE,
    ProductService
)

container.register<IProductController>(
    TOKENS.PRODUCT_CONTROLLER,
    ProductController
)
