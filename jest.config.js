/* eslint-disable no-undef */

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/migrations/'],
  globalSetup: './src/__tests__/_config/setup.ts',
  globalTeardown: './src/__tests__/_config/teardown.ts',
  moduleNameMapper: {
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@db$': '<rootDir>/src/_db/index.ts',
    '^@db/(.*)$': '<rootDir>/src/_db/$1',
    '^@config$': '<rootDir>/src/_config/index.ts',
    '^@config/(.*)$': '<rootDir>/src/_config/$1',
    '^@tests/(.*)$': '<rootDir>/src/__tests__/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/__tests__/_config/database.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.ts'],
}
