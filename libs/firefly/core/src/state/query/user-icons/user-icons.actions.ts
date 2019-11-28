import { SortField } from '@theory/ngxs';
import { Icon, UserIcon } from '@firefly/core/models';

import { ActionsUserIcons } from './user-icons.actions.enum';

export class ActionUserIconsReset   { static readonly type = ActionsUserIcons.Reset;   constructor() { } }
export class ActionUserIconsGetData { static readonly type = ActionsUserIcons.GetData; constructor(public fetch: boolean = true) { } }
export class ActionUserIconsGet     { static readonly type = ActionsUserIcons.Get;     constructor() { } }
export class ActionUserIconsSet     { static readonly type = ActionsUserIcons.Set;     constructor(public payload: Record<string, UserIcon>) { } }
export class ActionUserIconsSort    { static readonly type = ActionsUserIcons.Sort;    constructor(public payload?: SortField) { } }
export class ActionUserIconsAdd     { static readonly type = ActionsUserIcons.Add;     constructor(public payload: Icon) { } }
export class ActionUserIconsRemove  { static readonly type = ActionsUserIcons.Remove;  constructor(public payload: string) { } }
export class ActionUserIconsSync    { static readonly type = ActionsUserIcons.Sync;    constructor(public payload: Icon) { } }
export class ActionUserIconsDelete  { static readonly type = ActionsUserIcons.Delete;  constructor() { } }
