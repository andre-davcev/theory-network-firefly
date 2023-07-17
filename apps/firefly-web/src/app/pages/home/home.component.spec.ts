import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { HomeComponent, HomeComponentModule } from './home.component';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;

  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [HomeComponentModule],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
