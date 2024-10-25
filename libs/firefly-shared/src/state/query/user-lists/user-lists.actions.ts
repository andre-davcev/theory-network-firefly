import { DocumentSnapshot } from '@angular/fire/firestore';

import { List } from '@firefly/cloud';

import { ListsFilter } from '../../composite';
import { ActionsUserLists } from './user-lists.actions.enum';

export class ActionUserListsReset {
  static readonly type = ActionsUserLists.Reset;
}
export class ActionUserListsGetData {
  static readonly type = ActionsUserLists.GetData;
}
export class ActionUserListsGet {
  static readonly type = ActionsUserLists.Get;
}
export class ActionUserListsAdd {
  static readonly type = ActionsUserLists.Add;
  constructor(public snapshot: DocumentSnapshot<List>, public entity?: List) {}
}
export class ActionUserListsRemove {
  static readonly type = ActionsUserLists.Remove;
  constructor(public id: string) {}
}
export class ActionUserListsSync {
  static readonly type = ActionsUserLists.Sync;
  constructor(public object: List) {}
}
export class ActionUserListsFilter {
  static readonly type = ActionsUserLists.Filter;
  constructor(public filter: ListsFilter) {}
}
