/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          strict: true,
          noImplicitAny: true,
          strictNullChecks: true,
        },
      },
    ],
  },
  collectCoverageFrom: [
    'src/core/**/*.ts',
    'src/utils/**/*.ts',
    '!src/utils/proxy.ts',
    'src/ai/config.ts',
    'src/ai/llm-cache.ts',
    'src/ai/tool-manager.ts',
    'src/ai/tools/cards.ts',
    'src/ai/tools/data.ts',
    'src/ai/tools/extensions.ts',
    'src/ai/tools/parser.ts',
    'src/ai/tools/registry.ts',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['**/tests/**/*.test.ts'],
  setupFiles: ['<rootDir>/tests/jest-setup.ts'],
  testTimeout: 10000,
  verbose: true,
};
