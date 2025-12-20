import { testFunction } from '../__mocks__/test'

test('check manual mock is used', () => {
    const result = testFunction()
    expect(result).toBe('This is a mock functions') // Should log: 'This is a mock function'
})
