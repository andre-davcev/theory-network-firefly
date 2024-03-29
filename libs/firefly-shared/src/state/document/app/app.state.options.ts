import { StoreOptions } from '@ngxs/store/src/symbols';

import { CoreUtil } from '@theory/core';
import { RouterStateParams } from '@theory/ngxs';
import { EventType, InterestType } from '../../../enums';
import { StateAppModel } from './app.state.model';

export const DEFAULT_ROUTER_STATE: RouterStateParams = {
  url: '',
  params: {},
  queryParams: {}
};

export const StateAppOptions: StoreOptions<StateAppModel> = {
  name: 'app',

  defaults: {
    loading: false,
    loadingElement: null,
    interestType: InterestType.Unsubscribed,
    interestVirtual: false,
    eventType: EventType.Upcoming,
    eventVirtual: false,
    notificationsIndex: 0,
    routerState: CoreUtil.clone<RouterStateParams>(DEFAULT_ROUTER_STATE)
  }
};
