import { Tag } from '@theory/ionic';

import { TagEvent } from '../../../enums';
import { EventsFilter } from './events.filter.model';

export enum ActionsEvents {
  Filter = '[Events] Filter',
  TagSet = '[Events] TagSet'
}

export class ActionEventsFilter {
  static readonly type = ActionsEvents.Filter;
  constructor(public filter?: EventsFilter) {}
}

export class ActionEventsTagSet {
  static readonly type = ActionsEvents.TagSet;
  constructor(public tag: Tag<TagEvent>) {}
}
