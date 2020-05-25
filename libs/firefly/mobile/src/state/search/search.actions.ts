

import { ActionsSearch } from './search.actions.enum';


export class ActionSearchInterests   { static readonly type = ActionsSearch.SearchInterests; constructor(public searchString: string) {} }
export class ActionSearchEvents      { static readonly type = ActionsSearch.SearchEvents; constructor(public searchString: string) {} }
export class ActionSearchReset       { static readonly type = ActionsSearch.Reset;     constructor() {} }
