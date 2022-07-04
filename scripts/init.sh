#!/bin/bash

####################################################
# ESLint + Prettierの設定ファイルを作成する
####################################################

PATH_DIR_PARENT="$(dirname "$(cd "$(dirname "${BASH_SOURCE:-$0}")" && pwd)")"
cd ${PATH_DIR_PARENT}
green='\e[32;1m'

touch tsconfig.eslint.json .eslintrc.js .prettierignore .prettierrc.json jest.config.js

cat <<EOS > tsconfig.eslint.json
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.ts",
    ".eslintrc.js"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
EOS

printf "${green}Generated tsconfig.eslint.json\n"

cat <<EOS > .eslintrc.js
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json']
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  rules: {
  },
};
EOS

printf "${green}Generated .eslintrc.js\n"

cat <<EOS > .prettierignore
# Ignore artifacts:
/dist
node_modules
package.json
package-lock.json
tsconfig.json
tsconfig.eslint.json
EOS

printf "${green}Generated .prettierignore\n"

cat <<EOS > .prettierrc.json
{
  "tabWidth": 4,
  "useTabs": false,
  "singleQuote": true,
  "parser": "typescript"
}
EOS

printf "${green}Generated .prettierrc.json\n"

cat << EOS > jest.config.js
module.exports = {
    moduleFileExtensions: ['js', 'ts', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
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
EOS

printf "${green}Generated jest.config.js\n"
