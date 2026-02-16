import { get } from 'mongoose'
import { ICrudController } from '../../shared/crudControllerInterface'
import { ICrudRepository } from '../../shared/crudRepository'
import { ICrudService } from '../../shared/crudServiceInterface'
import {
    CreateInventoryBatchDTO,
    InventoryBatchBase,
    InventoryBatchDocument,
    UpdateInventoryBatchDTO,
} from './inventoryBatch.model'

export type IInventoryBatchController = ICrudController

export interface IInventoryBatchRepository extends ICrudRepository<
    InventoryBatchDocument,
    CreateInventoryBatchDTO,
    UpdateInventoryBatchDTO
> {
    getBatchNumberRepo(productId: string): Promise<string>
    findByProductId(productId: string): Promise<InventoryBatchBase[]>
}

export interface IInventoryBatchService extends ICrudService<InventoryBatchBase> {
    create(
        data: CreateInventoryBatchDTO & { productId: string }
    ): Promise<InventoryBatchBase> //override

    generateBatchNumber(productId: string): Promise<string>
    getInventoryByProductId(productId: string): Promise<InventoryBatchBase[]>
}
