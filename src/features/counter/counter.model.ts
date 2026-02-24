import { Document, model, Schema } from 'mongoose'

// Document<string> doing this i manually set id as string
export interface ICounter extends Document<string> {
    _id: string
    seq: number // last used number
}

export const counterSchema = new Schema<ICounter>(
    {
        _id: { type: String, required: true },
        seq: { type: Number },
    },
    { timestamps: true }
)

export const CounterModel = model<ICounter>('Counter', counterSchema)
