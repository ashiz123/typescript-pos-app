import { CrudRepository, ICrudRepository } from '../../shared/crudRepository'
import {
    CategoryModel,
    CreateCategoryDTO,
    ICategoryDocument,
    UpdateCategoryDTO,
} from './category.model'

export interface ICategoryRepository extends ICrudRepository<
    ICategoryDocument,
    CreateCategoryDTO,
    UpdateCategoryDTO
> {
    getChildren(id: string): Promise<ICategoryDocument[]>
}

export class CategoryRepository
    extends CrudRepository<
        ICategoryDocument,
        CreateCategoryDTO,
        UpdateCategoryDTO
    >
    implements ICategoryRepository
{
    constructor() {
        super(CategoryModel) // Pass the model to parent
    }

    async getChildren(id: string): Promise<ICategoryDocument[]> {
        return this.model.find({ parentCategoryId: id })
    }
}

export const categoryRepository = new CategoryRepository()
