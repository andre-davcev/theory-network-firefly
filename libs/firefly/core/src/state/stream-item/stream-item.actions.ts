import { StreamItem } from '@firefly/core/models';

import { ActionsStreamItem } from './stream-item.actions.enum';
import { CoreEnum } from '@theory/core';

export class ActionStreamItemReset  { static readonly type = ActionsStreamItem.Reset;   constructor() { } }
export class ActionStreamItemGet    { static readonly type = ActionsStreamItem.Get;     constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionStreamItemSet    { static readonly type = ActionsStreamItem.Set;     constructor(public payload: StreamItem) { } }
export class ActionStreamItemPatch  { static readonly type = ActionsStreamItem.Patch;   constructor(public payload: Partial<StreamItem>) { } }
export class ActionStreamItemCreate { static readonly type = ActionsStreamItem.Create;  constructor() { } }
export class ActionStreamItemSave   { static readonly type = ActionsStreamItem.Save;    constructor() { } }
export class ActionStreamItemDelete { static readonly type = ActionsStreamItem.Delete;  constructor() { } }
