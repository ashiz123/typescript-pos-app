import { ExtraValidationError, NotFoundError } from '../../errors/httpErrors'
import { CategoryRepository, ICategoryRepository } from './category.repository'
import { ICrudService } from '../../shared/baseService'
import { CreateCategoryDTO, ICategory } from './category.model'
import { Types, UpdateQuery } from 'mongoose'
import { CategoryRequest } from './validations/createCategoryValidation'

export class CategoryService implements ICrudService<ICategory> {
    private repo: ICategoryRepository

    constructor(repo: ICategoryRepository) {
        this.repo = repo
    }

    async getAll(): Promise<ICategory[]> {
        const categories = await this.repo.findAll()
        if (!categories.length) throw new NotFoundError('No categories found')
        return categories
    }

    async getById(id: string): Promise<ICategory | null> {
        if (!id) {
            throw new Error('Category id required')
        }
        return this.repo.findById(id)
        // if (category) throw new NotFoundError('Category not exist')
    }

    async create(data: Partial<ICategory>): Promise<ICategory> {
        const persistenceData: CreateCategoryDTO = {
            ...(data as CategoryRequest),
            businessId: new Types.ObjectId(data.businessId),
            parentCategoryId: data.parentCategoryId
                ? new Types.ObjectId(data.parentCategoryId)
                : undefined,
        }
        const newCategory = await this.repo.create(persistenceData)
        return newCategory
    }

    async update(
        id: string,
        data: UpdateQuery<ICategory>
    ): Promise<ICategory | null> {
        const updatedCategory = await this.repo.update(id, data)
        if (updatedCategory?.isNew === false) {
            throw new ExtraValidationError('No data to update')
        }
        return updatedCategory
    }

    async delete(id: string): Promise<boolean> {
        return this.repo.delete(id)
    }
}

export const categoryService = new CategoryService(new CategoryRepository())
