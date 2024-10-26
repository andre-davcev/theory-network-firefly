import { IonInfiniteScroll } from '@ionic/angular';

import { SubscriptionPartial } from '@firefly/cloud';
import { Tag } from '@theory/ionic';

import { ListType, TagList } from '../../../enums';
import { ActionsLists } from './lists.actions.enum';
import { ListsFilter } from './lists.filter.model';

export class ActionListsSetType {
  static readonly type = ActionsLists.SetType;
  constructor(public type: ListType) {}
}
export class ActionListsSetVirtual {
  static readonly type = ActionsLists.SetVirtual;
  constructor(public virtual: boolean) {}
}
export class ActionListsSetSubscriptions {
  static readonly type = ActionsLists.SetSubscriptions;
  constructor(
    public subscriptions: Record<string, SubscriptionPartial> | null,
    public save?: boolean
  ) {}
}
export class ActionListsFilter {
  static readonly type = ActionsLists.Filter;
  constructor(public filter?: ListsFilter) {}
}
export class ActionListsPage {
  static readonly type = ActionsLists.Page;
  constructor(public infiniteScroll?: IonInfiniteScroll) {}
}

export class ActionListsTagSet {
  static readonly type = ActionsLists.TagSet;
  constructor(public tag: Tag<TagList>) {}
}

export class ActionListsSubscriptionToggle {
  static readonly type = ActionsLists.SubscriptionToggle;
  constructor(public id: string, public permanent: boolean = false) {}
}
export class ActionListsSubscriptionAdd {
  static readonly type = ActionsLists.SubscriptionAdd;
  constructor(public id: string) {}
}
export class ActionListsSubscriptionRemove {
  static readonly type = ActionsLists.SubscriptionRemove;
  constructor(public id: string) {}
}
export class ActionListsSubscriptionOnOff {
  static readonly type = ActionsLists.SubscriptionOnOff;
  constructor(public id: string, public on: boolean) {}
}
