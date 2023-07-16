const esModules = [
  'nanoid',
  '@angular',
  '@ngneat',
  '@fortawesome',
  '@ngx-translate'
];
const ignoreModules = esModules.map((mod) => mod.replace('-', '\\-')).join('|');
const transformIgnorePatterns = [
  `node_modules/(?!${ignoreModules}.*.(mjs|js)$)`
];

/* eslint-disable */
export default {
  transformIgnorePatterns,
  displayName: 'firefly-shared',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  },
  coverageDirectory: '../../coverage/libs/firefly-shared',
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
