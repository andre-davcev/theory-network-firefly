import { StoreOptions } from '@ngxs/store/src/symbols';

import { Pages } from '@firefly/shared';

import { StateMobileModel } from './mobile.state.model';

export const StateMobileOptions: StoreOptions<StateMobileModel> = {
  name: 'mobile',

  defaults: {
    menuOpen: false,
    pageRoot: `/${Pages.Tabs}/${Pages.Events}`,

    pageChild: {
      [Pages.Tabs]: Pages.Events
    }
  }
};
