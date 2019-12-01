import { SortField } from '@theory/ngxs';
import { Alert, UserAlert } from '@firefly/core/models';

import { ActionsUserAlerts } from './user-alerts.actions.enum';

export class ActionUserAlertsReset   { static readonly type = ActionsUserAlerts.Reset;   constructor() { } }
export class ActionUserAlertsGetData { static readonly type = ActionsUserAlerts.GetData; constructor(public fetch: boolean = true) { } }
export class ActionUserAlertsGet     { static readonly type = ActionsUserAlerts.Get;     constructor() { } }
export class ActionUserAlertsSet     { static readonly type = ActionsUserAlerts.Set;     constructor(public payload: Record<string, UserAlert>) { } }
export class ActionUserAlertsSort    { static readonly type = ActionsUserAlerts.Sort;    constructor(public payload?: SortField) { } }
export class ActionUserAlertsAdd     { static readonly type = ActionsUserAlerts.Add;     constructor(public payload: Alert) { } }
export class ActionUserAlertsRemove  { static readonly type = ActionsUserAlerts.Remove;  constructor(public payload: string) { } }
export class ActionUserAlertsSync    { static readonly type = ActionsUserAlerts.Sync;    constructor(public payload: Alert) { } }
export class ActionUserAlertsDelete  { static readonly type = ActionsUserAlerts.Delete;  constructor() { } }
