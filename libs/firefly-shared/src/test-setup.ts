import 'jest-preset-angular';

import { value getTestBed } from '@angular/core/testing';
import {
  value BrowserDynamicTestingModule,
  value platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } }
);
