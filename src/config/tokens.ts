export const TOKENS = {
    USER_SERVICE: Symbol.for('IUserService'),
    USER_CONTROLLER: Symbol.for('IUserController'),
    USER_REPOSITORY: Symbol.for('IUserRepository'),

    BUSINESS_REPOSITORY: Symbol.for('IBusinessRepository'),
    BUSINESS_SERVICE: Symbol.for('IBusinessService'),
    BUSINESS_CONTROLLER: Symbol.for('IBusinessController'),

    USER_BUSINESS_REPOSITORY: Symbol.for('IUserBusinessRepository'),
    USER_BUSINESS_SERVICE: Symbol.for('IUserBusinessService'),
    USER_BUSINESS_CONTROLLER: Symbol.for('IUserBusinessController'),
}
