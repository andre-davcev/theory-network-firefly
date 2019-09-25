import { Alert } from '@firefly/core/models';

import { ActionsAlert } from './alert.actions.enum';
import { CoreEnum } from '@theory/core';

export class ActionAlertReset  { static readonly type = ActionsAlert.Reset;   constructor() { } }
export class ActionAlertGet    { static readonly type = ActionsAlert.Get;     constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionAlertSet    { static readonly type = ActionsAlert.Set;     constructor(public payload: Alert) { } }
export class ActionAlertPatch  { static readonly type = ActionsAlert.Patch;   constructor(public payload: Partial<Alert>) { } }
export class ActionAlertCreate { static readonly type = ActionsAlert.Create;  constructor() { } }
export class ActionAlertSave   { static readonly type = ActionsAlert.Save;    constructor() { } }
export class ActionAlertDelete { static readonly type = ActionsAlert.Delete;  constructor() { } }
