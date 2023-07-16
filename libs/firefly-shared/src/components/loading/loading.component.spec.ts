import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ComponentLoading } from './loading.component';
import { ModuleComponentLoading } from './loading.component.module';

describe('', () => {
  let spectator: Spectator<ComponentLoading>;

  const createComponent = createComponentFactory({
    component: ComponentLoading,
    imports: [ModuleComponentLoading],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
