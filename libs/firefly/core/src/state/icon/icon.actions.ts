import { Icon } from '@firefly/core/models';

import { ActionsIcon } from './icon.actions.enum';

export class ActionIconReset  { static readonly type = ActionsIcon.Reset;   constructor() { } }
export class ActionIconGet    { static readonly type = ActionsIcon.Get;     constructor() { } }
export class ActionIconSet    { static readonly type = ActionsIcon.Set;     constructor(public payload: Icon, public form: boolean = false) { } }
export class ActionIconPatch  { static readonly type = ActionsIcon.Patch;   constructor(public payload: Partial<Icon>) { } }
export class ActionIconSave   { static readonly type = ActionsIcon.Save;    constructor() { } }
export class ActionIconCreate { static readonly type = ActionsIcon.Create;  constructor() { } }
export class ActionIconUpdate { static readonly type = ActionsIcon.Update;  constructor() { } }
export class ActionIconDelete { static readonly type = ActionsIcon.Delete;  constructor() { } }
