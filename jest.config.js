/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts'],
  roots: ['./src/slim-select'],
  reporters: process.env.CI ? [['github-actions', {silent: false}], 'summary'] : ['default'],
  coverageThreshold: {
    global: {
      lines: 75,
    },
  },
}
