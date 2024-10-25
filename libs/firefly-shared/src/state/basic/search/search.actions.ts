import { ActionsSearch } from './search.actions.enum';

export class ActionSearchLists {
  static readonly type = ActionsSearch.SearchLists;
  constructor(public searchString: string) {}
}
export class ActionSearchEvents {
  static readonly type = ActionsSearch.SearchEvents;
  constructor(public searchString: string) {}
}
export class ActionSearchReset {
  static readonly type = ActionsSearch.Reset;
}
