export const createMockAuthService = (jestInstance) => {
    const request = {name : 'Mock User', email: 'mock@example.com', phone: '1234567890' , password: 'password123'};
    const error = 'Registeration failed';
    return {
        login: jestInstance.fn().mockResolvedValue({ token: 'mocked-jwt-token' }),
        register: jestInstance.fn().mockResolvedValue(request),
        logout: jestInstance.fn().mockResolvedValue(null)
    }
}


export const mockAuthRepository =(jestInstance) => {
    return{
        createUser: jestInstance.fn(),
        findByEmail: jestInstance.fn()
    }
}
