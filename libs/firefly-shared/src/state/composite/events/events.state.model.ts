import { StoreOptions } from '@ngxs/store/src/symbols';

import { Tag } from '@theory/ionic';
import { TagEvent, TagEventDefault } from '../../../enums';
import { EventsFilter } from './events.filter.model';

export interface StateEventsModel {
  filter: EventsFilter;
  tag: Tag<TagEvent> | null;
}

export const StateEventsDefaults: StoreOptions<StateEventsModel> = {
  name: 'events',

  defaults: {
    filter: {
      tag: TagEventDefault.Upcoming
    },
    tag: null
  }
};
