import { container } from 'tsyringe'

import {
    IInventoryBatchController,
    IInventoryBatchService,
    IInventoryBatchRepository,
} from './inventoryBatch.type'
import { TOKENS } from '../../config/tokens'
import { InventoryBatchService } from './inventoryBatch.Service'
import { InventoryBatchRepository } from './inventoryBatch.repository'
import { InventoryBatchController } from './inventoryBatch.controller'

container.registerSingleton<IInventoryBatchService>(
    TOKENS.INVENTORY_BATCH_SERVICE,
    InventoryBatchService
)
container.registerSingleton<IInventoryBatchRepository>(
    TOKENS.INVENTORY_BATCH_REPOSITORY,
    InventoryBatchRepository
)
container.registerSingleton<IInventoryBatchController>(
    TOKENS.INVENTORY_BATCH_CONTROLLER,
    InventoryBatchController
)
