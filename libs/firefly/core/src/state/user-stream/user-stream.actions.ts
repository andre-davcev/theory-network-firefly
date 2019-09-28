import { SortField } from '@theory/state';
import { StreamItem, UserStreamItem } from '@firefly/core/models';

import { ActionsUserStream } from './user-stream.actions.enum';

export class ActionUserStreamReset   { static readonly type = ActionsUserStream.Reset;   constructor() { } }
export class ActionUserStreamGetData { static readonly type = ActionsUserStream.GetData; constructor() { } }
export class ActionUserStreamGet     { static readonly type = ActionsUserStream.Get;     constructor() { } }
export class ActionUserStreamSet     { static readonly type = ActionsUserStream.Set;     constructor(public payload: Record<string, UserStreamItem>) { } }
export class ActionUserStreamSort    { static readonly type = ActionsUserStream.Sort;    constructor(public payload?: SortField) { } }
export class ActionUserStreamAdd     { static readonly type = ActionsUserStream.Add;     constructor(public payload: StreamItem) { } }
export class ActionUserStreamRemove  { static readonly type = ActionsUserStream.Remove;  constructor(public payload: string) { } }
export class ActionUserStreamDelete  { static readonly type = ActionsUserStream.Delete;  constructor() { } }
