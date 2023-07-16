import { DocumentSnapshot } from '@angular/fire/firestore';

import { Interest } from '@firefly/cloud';

import { InterestsFilter } from '../../composite';
import { ActionsUserInterests } from './user-interests.actions.enum';

export class ActionUserInterestsReset {
  static readonly type = ActionsUserInterests.Reset;
}
export class ActionUserInterestsGetData {
  static readonly type = ActionsUserInterests.GetData;
}
export class ActionUserInterestsGet {
  static readonly type = ActionsUserInterests.Get;
}
export class ActionUserInterestsAdd {
  static readonly type = ActionsUserInterests.Add;
  constructor(
    public snapshot: DocumentSnapshot<Interest>,
    public entity?: Interest
  ) {}
}
export class ActionUserInterestsRemove {
  static readonly type = ActionsUserInterests.Remove;
  constructor(public id: string) {}
}
export class ActionUserInterestsSync {
  static readonly type = ActionsUserInterests.Sync;
  constructor(public object: Interest) {}
}
export class ActionUserInterestsFilter {
  static readonly type = ActionsUserInterests.Filter;
  constructor(public filter: InterestsFilter) {}
}
