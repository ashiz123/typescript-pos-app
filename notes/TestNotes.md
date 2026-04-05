# TEST NOTES

TEST STEPS
1. MOCK - mockUser.loggedIn.mockResolvedValue(userData)
2. ACTION - await authService.create(data)
3. ASSERTION - expect()


WHY ACTION IN TEST MUST HAVE AWAIT ?
1. We do await in success case. Its because we know the test is going to pass and goes to next line. 
2. We dont- await in failure case. if we do, it does not go next line, so better await in expect line.


WE HAVE SEPARATE ENVIRONMENT TO RUN THE TEST
setup file - vitest.config.ts - separate projects setup for different test( integration, unit)
- Reason is that unit test does not need database connection. 
- See the package.json for other setup. 

TEST:UNIT
1 . To run - npm run test:unit
2. To run in watch mode - npm run test:unit:watch


TEST:INTEGRATION
1 . To run - npm run test:int
2. To run in watch mode - npm run test:int:watch
