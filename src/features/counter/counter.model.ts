import { Document, model, Schema } from 'mongoose'

// Document<string> doing this i manually set id as string
export interface ICounter extends Document<string> {
    _id: string
    date: string // YYYY-MM-DD, to reset daily
    seq: number // last used number
}

export const counterSchema = new Schema<ICounter>(
    {
        _id: { type: String, required: true },
        seq: { type: Number },
        date: { type: String, required: true },
    },
    { timestamps: true }
)

counterSchema.index({ type: 1, date: 1 }, { unique: true })

export const CounterModel = model<ICounter>('Counter', counterSchema)
