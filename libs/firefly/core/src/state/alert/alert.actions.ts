import { Alert } from '@firefly/core/models';
import { CoreEnum } from '@theory/core';

import { ActionsAlert } from './alert.actions.enum';

export class ActionAlertReset       { static readonly type = ActionsAlert.Reset;     constructor() { }}
export class ActionAlertGet         { static readonly type = ActionsAlert.Get;       constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionAlertCreate      { static readonly type = ActionsAlert.Create;    constructor() { } }
export class ActionAlertDelete      { static readonly type = ActionsAlert.Delete;    constructor() { } }
export class ActionAlertPatch       { static readonly type = ActionsAlert.Patch;     constructor() { } }
export class ActionAlertPatchForm   { static readonly type = ActionsAlert.PatchForm; constructor(public payload: Partial<Alert>) {} }
