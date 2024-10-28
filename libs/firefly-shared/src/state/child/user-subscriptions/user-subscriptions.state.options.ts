import { StoreOptions } from '@ngxs/store/src/symbols';

import { TypeOf } from '@theory/core';
import { OrderBy } from '@theory/firebase';
import { PageSize } from '@theory/ngxs';

import { TagListDefault } from '../../../enums';
import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';

export const StateUserSubscriptionsOptions: StoreOptions<StateUserSubscriptionsModel> =
  {
    name: 'userSubscriptions',

    defaults: {
      pageSize: PageSize.MobileCards,
      orderBy: 'name',
      orderByDirection: OrderBy.Ascending,

      initialized: false,
      loading: false,
      finishedPaging: false,

      snapshotLookup: {},
      dataLookup: {},

      childLookup: {},
      keys: [],
      id: '',
      data: [],

      sortFields: {
        name: TypeOf.String,
        dateCreated: TypeOf.String
      },

      filter: {
        virtual: false,
        subscriptions: {},
        tag: TagListDefault.Popular
      }
    }
  };
