import { StoreOptions } from '@ngxs/store/src/symbols';

import { InterestType, EventType } from '../../../enums';
import { StateAppModel } from './app.state.model';

export const StateAppOptions: StoreOptions<StateAppModel> = {
  name: 'app',

  defaults: {
    loading: false,
    loadingElement: null,
    interestType: InterestType.Unsubscribed,
    interestVirtual: false,
    eventType: EventType.Upcoming,
    eventVirtual: false,
    notificationsIndex: 0
  }
};
