import { List } from '@firefly/cloud';
import { DocumentSnapshot } from '@theory/firebase';

import { ActionsListEvents } from './list-events.actions.enum';

export class ActionListEventsReset {
  static readonly type = ActionsListEvents.Reset;
}
export class ActionClusterEventsGetData {
  static readonly type = ActionsListEvents.GetData;
}
export class ActionListEventsGet {
  static readonly type = ActionsListEvents.Get;
}
export class ActionListEventsAdd {
  static readonly type = ActionsListEvents.Add;
  constructor(public snapshot: DocumentSnapshot<List>, public entity?: List) {}
}
export class ActionListEventsRemove {
  static readonly type = ActionsListEvents.Remove;
  constructor(public id: string) {}
}
export class ActionListEventsSync {
  static readonly type = ActionsListEvents.Sync;
  constructor(public object: List) {}
}
export class ActionListEventsFilter {
  static readonly type = ActionsListEvents.Filter;
}
