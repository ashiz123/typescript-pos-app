import { BaseError } from './baseError.js'

export class BadRequestError extends BaseError {
    constructor(message = 'Bad Request', location = 'unknown') {
        super(message, location, 400, true)
        this.name = 'BadRequestError'
    }
}

export class NotFoundError extends BaseError {
    constructor(message = 'Not Found', location = 'unknown') {
        super(message, location, 404, true)
        this.name = 'NotFoundError'
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized', location = 'unknown') {
        super(message, location, 401, true)
        this.name = 'UnauthorizedError'
    }
}

export class forbiddenError extends BaseError {
    constructor(message = 'Forbidden', location = 'unknown') {
        super(message, location, 403, true)
        this.name = 'ForbiddenError'
    }
}

export class ConflictError extends BaseError {
    constructor(message = 'Conflict', location = 'unknown') {
        super(message, location, 409, true)
        this.name = 'ConflictError'
    }
}

export class InternalServerError extends BaseError {
    constructor(message = 'Internal Server Error', location = 'unknown') {
        super(message, location, 500, false)
        this.name = 'InternalServerError'
    }
}

export class DuplicateEntry extends BaseError {
    constructor(message = 'Duplicate data entry found', location = 'unknown') {
        super(message, location, 400, true)
        this.name = 'DuplicateEntry'
    }
}
