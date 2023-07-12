import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ComponentImageGrid } from './image-grid.component';
import { ModuleComponentImageGrid } from './image-grid.component.module';

describe('AppStoreIosComponent', () => {
  let spectator: Spectator<ComponentImageGrid>;

  const createComponent = createComponentFactory({
    component: ComponentImageGrid,
    imports: [ModuleComponentImageGrid],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
