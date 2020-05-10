

import { ActionsSearch } from './search.actions.enum';


export class ActionSearchAll   { static readonly type = ActionsSearch.SearchAll;    constructor(public searchString: string) {} }
