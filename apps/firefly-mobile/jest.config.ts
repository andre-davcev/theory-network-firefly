const esModules = [];
const ignoreModules = esModules.map((mod) => mod.replace('-', '\\-')).join('|');
const transformIgnorePatterns = [
  `node_modules/(?!${ignoreModules}.*.(mjs|js)$)`
];

/* eslint-disable */

/* eslint-disable */
export default {
  transformIgnorePatterns,
  displayName: 'firefly-mobile',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  },
  coverageDirectory: '../../coverage/apps/firefly-mobile',
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      lines: 95,
      functions: 95
    }
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular'
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ]
};
