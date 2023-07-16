import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ComponentIcon } from './icon.component';
import { ModuleComponentIcon } from './icon.component.module';

describe('', () => {
  let spectator: Spectator<ComponentIcon>;

  const createComponent = createComponentFactory({
    component: ComponentIcon,
    imports: [ModuleComponentIcon],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
