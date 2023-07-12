import { createComponentFactory, Spectator } from '@ngneat/spectator';

import {
  DeviceIPhoneComponent,
  DeviceIPhoneComponentModule
} from './device-iphone.component';

describe('DeviceIPhoneComponent', () => {
  let spectator: Spectator<DeviceIPhoneComponent>;

  const createComponent = createComponentFactory({
    component: DeviceIPhoneComponent,
    imports: [DeviceIPhoneComponentModule],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
