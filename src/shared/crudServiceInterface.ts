import { UpdateQuery } from 'mongoose'

export interface ICrudService<T> {
    getAll(): Promise<T[]>
    getById(id: string): Promise<T | null>
    create(data: Partial<T>): Promise<T>
    update(id: string, data: UpdateQuery<T>): Promise<T | null>
    delete(id: string): Promise<boolean>
}
