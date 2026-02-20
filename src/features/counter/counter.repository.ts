import { injectable } from 'tsyringe'
import { CounterModel } from './counter.model'

export interface ICounterRepository {
    getNextSequence(date: string, id?: string): Promise<number>
}

@injectable()
export class CounterRepository implements ICounterRepository {
    private counter: typeof CounterModel

    constructor() {
        this.counter = CounterModel
    }
    //$setOnInsert only works , if document is being created rather than updating it.
    async getNextSequence(date: string, id: string = 'order'): Promise<number> {
        const counter = await this.counter.findOneAndUpdate(
            { _id: id, date: date },
            {
                $inc: { seq: 1 },
                $setOnInsert: { createdAt: new Date() },
            },
            {
                upsert: true,
                new: true,
            }
        )

        return counter!.seq + 100
    }
}
