import { add, subtract, multiply, divide } from '../src/testing/math'

describe('add', () => {
    it('adds numbers', () => {
        expect(add(2, 3)).toBe(5)
    })
})

describe('subtract', () => {
    it('subtracts numbers', () => {
        expect(subtract(5, 3)).toBe(2)
    })
})
