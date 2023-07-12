import { createComponentFactory, Spectator } from '@ngneat/spectator';

import {
  AppStoreGoogleComponent,
  AppStoreGoogleComponentModule
} from './app-store-google.component';

describe('AppStoreGoogleComponent', () => {
  let spectator: Spectator<AppStoreGoogleComponent>;

  const createComponent = createComponentFactory({
    component: AppStoreGoogleComponent,
    imports: [AppStoreGoogleComponentModule],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
