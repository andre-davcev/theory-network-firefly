import { DocumentSnapshot } from '@theory/firebase';
import { Interest } from '@firefly/cloud';

import { ActionsClusterEvents } from './cluster-events.actions.enum';

export class ActionClusterEventsReset {
  static readonly type = ActionsClusterEvents.Reset;
}
export class ActionClusterEventsGetData {
  static readonly type = ActionsClusterEvents.GetData;
}
export class ActionClusterEventsGet {
  static readonly type = ActionsClusterEvents.Get;
}
export class ActionClusterEventsAdd {
  static readonly type = ActionsClusterEvents.Add;
  constructor(public snapshot: DocumentSnapshot, public entity?: Interest) {}
}
export class ActionClusterEventsRemove {
  static readonly type = ActionsClusterEvents.Remove;
  constructor(public id: string) {}
}
export class ActionClusterEventsSync {
  static readonly type = ActionsClusterEvents.Sync;
  constructor(public object: Interest) {}
}
export class ActionClusterEventsFilter {
  static readonly type = ActionsClusterEvents.Filter;
}
