import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentIconSubscribe } from './icon-subscribe.component';
import { ModuleComponentIconSubscribe } from './icon-subscribe.component.module';

describe('', () => {
  let spectator: Spectator<ComponentIconSubscribe>;

  const createComponent = createComponentFactory({
    component: ComponentIconSubscribe,
    imports: [ModuleComponentIconSubscribe, TranslateModule.forRoot()],
    declareComponent: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
