import { jest } from '@jest/globals'

// 1️⃣ Set up the manual mock
await jest.unstable_mockModule('../dist/features/testing/math.js', () => ({
    addNumber: jest.fn(() => 10),
    multiplyNumber: jest.fn(() => 20),
}))

// 2️⃣ Dynamically import the mocked module
const math = await import('../dist/features/testing/math.js')

test('addNumber returns 10', () => {
    expect(math.addNumber(4, 3)).toBe(10)
    expect(math.addNumber).toHaveBeenCalledWith(4, 3)
})

test('multiplyNumber returns 20', () => {
    expect(math.multiplyNumber(2, 3)).toBe(20)
})
