import { Alert } from '@firefly/cloud';

import { ActionsUserAlerts } from './user-alerts.actions.enum';
import { firestore } from 'firebase/app';

export class ActionUserAlertsReset   { static readonly type = ActionsUserAlerts.Reset;   constructor() { } }
export class ActionUserAlertsGetData { static readonly type = ActionsUserAlerts.GetData; constructor() { } }
export class ActionUserAlertsGet     { static readonly type = ActionsUserAlerts.Get;     constructor() { } }
export class ActionUserAlertsAdd     { static readonly type = ActionsUserAlerts.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: Alert) { } }
export class ActionUserAlertsRemove  { static readonly type = ActionsUserAlerts.Remove;  constructor(public id: string) { } }
export class ActionUserAlertsSync    { static readonly type = ActionsUserAlerts.Sync;    constructor(public object: Alert) { } }
export class ActionUserAlertsGo      { static readonly type = ActionsUserAlerts.Go;     constructor() { } }
export class ActionUserAlertsMarkRead { static readonly type = ActionsUserAlerts.MarkRead;    constructor() { } }
