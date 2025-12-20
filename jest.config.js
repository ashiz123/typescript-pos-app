export default {
    setupFilesAfterEnv: ['<rootDir>/tests/setup/setupTests.js'],
    globalSetup: '<rootDir>/tests/setup/globalSetup.js',
    globalTeardown: '<rootDir>/tests/setup/globalTeardown.js',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.js'],
    testMatch: ['**/?(*.)+(test|spec).js'],
    roots: ['./tests'],
    moduleFileExtensions: ['js', 'json', 'node'],
    testPathIgnorePatterns: ['\\.d\\.ts$', '/node_modules/'],
}
