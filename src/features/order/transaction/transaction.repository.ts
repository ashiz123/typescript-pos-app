import {
    TransactionType,
    TransactionDocument,
    TransactionModel,
} from './transaction.model'
import { ITransactionRepository } from './transaction.type'

export class TransactionRepository implements ITransactionRepository {
    private model: typeof TransactionModel

    constructor() {
        this.model = TransactionModel
    }

    async createTransaction(
        transaction: TransactionType
    ): Promise<TransactionDocument> {
        return this.model.create(transaction)
    }
}
