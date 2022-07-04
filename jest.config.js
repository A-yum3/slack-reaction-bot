module.exports = {
    moduleFileExtensions: ['js', 'ts', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/',
    },
    transform: {
        '^.+\.ts$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverageFrom: ['src/**/*.{ts,js}'],
    coverageDirectory: 'coverage',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                suiteName: 'jest tests',
                outputDirectory: 'reports/jest',
                outputName: 'js-test-results.xml',
                classNameTemplate: '{classname}-{title}',
                titleTemplate: '{classname}-{title}',
                ancestorSeparator: ' › ',
            },
        ],
    ],
};
