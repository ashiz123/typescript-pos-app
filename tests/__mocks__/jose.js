export const jwtVerify = jest.fn().mockImplementation(async (token, secret, options) => {
    if (token === 'valid.token.here') {
        return {
            payload: {
                userId: '12345',
                role: 'admin',
                iss: 'my-issuer',
                aud: 'my-audience',
            },
        };
    }
    else {
        throw new Error('Invalid token');
    }
})