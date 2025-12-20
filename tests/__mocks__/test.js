export const testFunction = () => {
    return 'This is a mock functions'
}

//how to use this mock in test file 
//jest.mock('../../dist/mocks/test.js') 

// import { testFunction } from '../../dist/mocks/test.js'

// test('check manual mock is used', () => {
//     const result = testFunction()
//     console.log('Mock function result:', result) // Should log: 'This is a mock function'
// })

// when to use mockImplemntation
// export const testFunction = jest.fn().mockImplementation(() => {
//     return 'This is a mock function with implementation'
// })