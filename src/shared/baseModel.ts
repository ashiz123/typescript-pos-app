import {
    Schema,
    model,
    Model,
    Document,
    SchemaDefinition,
    SchemaOptions,
} from 'mongoose'

export abstract class BaseModel<T> {
    public model: Model<T & Document>

    constructor(
        modelName: string,
        defination: SchemaDefinition,
        options?: SchemaOptions
    ) {
        const schema = new Schema(
            { ...defination },
            { timestamps: true, ...options }
        )

        this.model = model<T & Document>(modelName, schema)
    }
}
