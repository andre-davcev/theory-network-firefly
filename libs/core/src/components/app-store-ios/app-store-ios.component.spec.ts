import { createComponentFactory, Spectator } from '@ngneat/spectator';

import {
  AppStoreIosComponent,
  AppStoreIosComponentModule
} from './app-store-ios.component';

describe('AppStoreIosComponent', () => {
  let spectator: Spectator<AppStoreIosComponent>;

  const createComponent = createComponentFactory({
    component: AppStoreIosComponent,
    imports: [AppStoreIosComponentModule],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
