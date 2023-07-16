import { StreamInterest, SubscriptionPartial } from '@firefly/cloud';

import { DocumentSnapshot } from '@theory/firebase';

import { InterestsFilter } from '../../composite';
import { ActionsCityStream } from './city-stream.actions.enum';

export class ActionCityStreamReset {
  static readonly type = ActionsCityStream.Reset;
}
export class ActionCityStreamGetData {
  static readonly type = ActionsCityStream.GetData;
  constructor(public id: string, public fetch: boolean = false) {}
}
export class ActionCityStreamSetData {
  static readonly type = ActionsCityStream.SetData;
  constructor(
    public data: Record<string, StreamInterest>,
    public fetch: boolean = false
  ) {}
}
export class ActionCityStreamGet {
  static readonly type = ActionsCityStream.Get;
}
export class ActionCityStreamAdd {
  static readonly type = ActionsCityStream.Add;
  constructor(
    public snapshot: DocumentSnapshot<StreamInterest>,
    public entity?: StreamInterest
  ) {}
}
export class ActionCityStreamRemove {
  static readonly type = ActionsCityStream.Remove;
  constructor(public id: string) {}
}
export class ActionCityStreamSync {
  static readonly type = ActionsCityStream.Sync;
  constructor(public object: StreamInterest) {}
}
export class ActionCityStreamFilter {
  static readonly type = ActionsCityStream.Filter;
  constructor(public filter: InterestsFilter) {}
}

export class ActionCityStreamSubscriptionNew {
  static readonly type = ActionsCityStream.SubscriptionNew;
  constructor(public id: string) {}
}
export class ActionCityStreamSubscriptionsSet {
  static readonly type = ActionsCityStream.SubscriptionsSet;
  constructor(public subscriptions: Record<string, SubscriptionPartial>) {}
}
