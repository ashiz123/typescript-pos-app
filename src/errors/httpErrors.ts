import { HttpBaseError } from './httpBaseError.js'

export class BadRequestError extends HttpBaseError {
    constructor(message = 'Bad Request', location = 'unknown') {
        super(message, location, 400, true)
        this.name = 'BadRequestError'
    }
}

export class NotFoundError extends HttpBaseError {
    constructor(message = 'Not Found', location = 'unknown') {
        super(message, location, 404, true)
        this.name = 'NotFoundError'
    }
}

export class UnauthorizedError extends HttpBaseError {
    constructor(message = 'Unauthorized', location = 'unknown') {
        super(message, location, 401, true)
        this.name = 'UnauthorizedError'
    }
}

export class forbiddenError extends HttpBaseError {
    constructor(message = 'Forbidden', location = 'unknown') {
        super(message, location, 403, true)
        this.name = 'ForbiddenError'
    }
}

export class ConflictError extends HttpBaseError {
    constructor(message = 'Conflict', location = 'unknown') {
        super(message, location, 409, true)
        this.name = 'ConflictError'
    }
}

export class InternalServerError extends HttpBaseError {
    constructor(message = 'Internal Server Error', location = 'unknown') {
        super(message, location, 500, false)
        this.name = 'InternalServerError'
    }
}

export class DuplicateEntry extends HttpBaseError {
    constructor(message = 'Duplicate data entry found', location = 'unknown') {
        super(message, location, 400, true)
        this.name = 'DuplicateEntry'
    }
}

export class ExtraValidationError extends HttpBaseError {
    constructor(
        message = 'Extra validation error from db',
        location = 'unknown'
    ) {
        super(message, location, 400, true)
        this.name = 'Extra validation error'
    }
}
