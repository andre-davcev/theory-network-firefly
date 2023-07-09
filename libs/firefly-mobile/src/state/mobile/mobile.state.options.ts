import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateMobileModel } from './mobile.state.model';
import { Pages } from '../../enums';

export const StateMobileOptions: StoreOptions<StateMobileModel> = {
  name: 'mobile',

  defaults: {
    menuOpen: false,
    pageRoot: `/${Pages.Home}/${Pages.Stream}`,

    pageChild: {
      [Pages.Home]: Pages.Stream
    }
  }
};
