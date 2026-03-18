import { TransactionDocument, TransactionType } from './transaction.model'

export interface ITransactionRepository {
    createTransaction(
        transaction: TransactionType
    ): Promise<TransactionDocument>
    // getTransactionById(id: string): Promise<TransactionDocument | null>
    // updateTransaction(
    //     id: string,
    //     transaction: TransactionType
    // ): Promise<TransactionDocument | null>
    // deleteTransaction(id: string): Promise<TransactionDocument | null>
    // getAllTransactions(): Promise<TransactionDocument[]>
    // getTransactionsByCustomerId(
    //     customerId: string
    // ): Promise<TransactionDocument[]>
}
