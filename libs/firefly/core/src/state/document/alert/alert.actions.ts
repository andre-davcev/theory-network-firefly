

import { CoreEnum } from '@theory/core';
import { Alert} from '@firefly/cloud';

import { ActionsAlert } from './alert.actions.enum';
import { firestore } from 'firebase';

export class ActionAlertReset  { static readonly type = ActionsAlert.Reset;   constructor() { } }
export class ActionAlertDirty  { static readonly type = ActionsAlert.Dirty;   constructor() { } }
export class ActionAlertGet    { static readonly type = ActionsAlert.Get;     constructor(public id: string) { } }
export class ActionAlertSet    { static readonly type = ActionsAlert.Set;     constructor(public snapshot: firestore.DocumentSnapshot, public data?: Alert) { } }
export class ActionAlertPatch  { static readonly type = ActionsAlert.Patch;   constructor(public partial: Partial<Alert>, public save: boolean = false) { } }
export class ActionAlertCreate { static readonly type = ActionsAlert.Create;  constructor() { } }
export class ActionAlertUpdate { static readonly type = ActionsAlert.Update;  constructor() { } }
export class ActionAlertSave   { static readonly type = ActionsAlert.Save;    constructor() { } }
export class ActionAlertDelete { static readonly type = ActionsAlert.Delete;  constructor() { } }
export class ActionAlertSetId  { static readonly type = ActionsAlert.SetId;   constructor(public id: string = CoreEnum.IdNew) { } }
export class ActionAlertMarkRead  { static readonly type = ActionsAlert.MarkRead;   constructor() { } }
