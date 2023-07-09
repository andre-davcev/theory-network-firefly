import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateNotificationsModel } from './notifications.state.model';

export const StateNotificationsOptions: StoreOptions<StateNotificationsModel> =
  {
    name: 'notifications',

    defaults: {
      notifications: [],
      notification: undefined
    }
  };
