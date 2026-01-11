import { ZodError } from 'zod'
import { HttpBaseError } from './httpBaseError.js'

export function isHttpError(err: unknown): err is HttpBaseError {
    return (
        !!err &&
        typeof err === 'object' &&
        'statusCode' in err &&
        'expose' in err &&
        (err as Record<string, unknown>).type === 'baseError'
    )
}

export function isError(err: unknown): err is Error {
    return err instanceof Error
}

export function isZodError(err: unknown): err is ZodError {
    return err instanceof ZodError
}

export function isMongoDuplicateKeyError(
    err: unknown
): err is { code: number; errmsg: string } {
    return (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as Record<string, unknown>).code === 11000
    )
}

// export function isHttpError(err: unknown): err is HttpError {
//   return typeof err === "object" && err !== null && "statusCode" in err;
// }

//NOTE: The return type `err is Error` is a typescript type predicate
// It does not mean this function return an error object
// If this function return true err as an Error inside that code block
// If the function is true than the err is an Error , if false err is still Unknown
