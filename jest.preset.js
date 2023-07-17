const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,

  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: [
    // TEST TYPESCRIPT
    'src/**/*.ts',

    // DO NOT TEST
    '!src/**/*.spec.ts', // Unit tests
    '!src/**/stories/**', // Storybook Project
    '!src/**/*.stories.ts', // Storybook Files
    '!src/**/index.ts', // Barrel files
    '!src/**/*.module.ts', // Modules
    '!src/**/environments/**', // Environments
    '!src/**/main.ts', // Main
    '!src/**/polyfills.ts', // Polyfills
    '!src/**/*.mock.ts' // Mocks
  ]
};
