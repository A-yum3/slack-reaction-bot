module.exports = {
    moduleFileExtensions: ['js', 'ts', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/',
    },
    transform: {
        '^.+\.ts$': 'esbuild-jest',
    },
    testMatch: ['**/tests/**/*.test.ts'],
};
