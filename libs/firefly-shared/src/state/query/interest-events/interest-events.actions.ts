import { Interest } from '@firefly/cloud';
import { DocumentSnapshot } from '@theory/firebase';

import { ActionsInterestEvents } from './interest-events.actions.enum';

export class ActionInterestEventsReset {
  static readonly type = ActionsInterestEvents.Reset;
}
export class ActionClusterEventsGetData {
  static readonly type = ActionsInterestEvents.GetData;
}
export class ActionInterestEventsGet {
  static readonly type = ActionsInterestEvents.Get;
}
export class ActionInterestEventsAdd {
  static readonly type = ActionsInterestEvents.Add;
  constructor(
    public snapshot: DocumentSnapshot<Interest>,
    public entity?: Interest
  ) {}
}
export class ActionInterestEventsRemove {
  static readonly type = ActionsInterestEvents.Remove;
  constructor(public id: string) {}
}
export class ActionInterestEventsSync {
  static readonly type = ActionsInterestEvents.Sync;
  constructor(public object: Interest) {}
}
export class ActionInterestEventsFilter {
  static readonly type = ActionsInterestEvents.Filter;
}
