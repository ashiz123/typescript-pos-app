import z from 'zod'

const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

const ProductSchema = z
    .object({
        name: z.string(),
        // barcode: z.string().min(5, 'Barcode must be less than 5 words'),
        sku: z.string().min(3, 'SKU must be less than 3 words'),
        description: z.string().optional(),
        price: z.number().positive('Price should be all positive'),
        costPrice: z.number().positive('Cost price should be positive value'),
        stockQuantity: z
            .number()
            .int()
            .nonnegative('Stock value should be at least 1'),
        isActive: z.boolean().default(true),
    })
    .strict()

export const CreateProductSchema = ProductSchema.extend({
    categoryId: objectIdSchema,
})

export const UpdateProductSchema = ProductSchema.omit({
    sku: true,
}).partial()

export type ProductRequest = z.infer<typeof CreateProductSchema>
export type ProductUpdate = z.infer<typeof UpdateProductSchema>
