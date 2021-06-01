import { Alert, AlertPartial } from '@firefly/cloud';
import { DocumentSnapshot } from '@theory/firebase';

import { ActionsUserAlerts } from './user-alerts.actions.enum';
import { CalendarFilter } from '../../composite/calendar/calendar.filter.model';

export class ActionUserAlertsReset   { static readonly type = ActionsUserAlerts.Reset;   constructor() { } }
export class ActionUserAlertsGetData { static readonly type = ActionsUserAlerts.GetData; constructor() { } }
export class ActionUserAlertsSetData { static readonly type = ActionsUserAlerts.SetData; constructor(public data: Record<string, AlertPartial>, public fetch: boolean = false) { } }
export class ActionUserAlertsGet     { static readonly type = ActionsUserAlerts.Get;     constructor() { } }
export class ActionUserAlertsAdd     { static readonly type = ActionsUserAlerts.Add;     constructor(public snapshot: DocumentSnapshot, public entity?: Alert) { } }
export class ActionUserAlertsRemove  { static readonly type = ActionsUserAlerts.Remove;  constructor(public id: string) { } }
export class ActionUserAlertsSync    { static readonly type = ActionsUserAlerts.Sync;    constructor(public object: Alert) { } }
export class ActionUserAlertsFilter  { static readonly type = ActionsUserAlerts.Filter;  constructor(public filter: CalendarFilter) { } }

export class ActionUserAlertsGo               { static readonly type = ActionsUserAlerts.Go;               constructor(public alert: Alert) { } }
export class ActionUserAlertsGetIcons         { static readonly type = ActionsUserAlerts.GetIcons;         constructor() { } }
export class ActionUserAlertsGetImages        { static readonly type = ActionsUserAlerts.GetImages;        constructor() { } }
export class ActionUserAlertsMarkRead         { static readonly type = ActionsUserAlerts.MarkRead;         constructor(public id: string) { } }
export class ActionUserAlertsDelete           { static readonly type = ActionsUserAlerts.Delete;           constructor(public id: string) { } }

export class ActionUserAlertsAddToCalendar    { static readonly type = ActionsUserAlerts.AddToCalendar;    constructor(public alert: Alert) { } }
export class ActionUserAlertsLaunchNavigation { static readonly type = ActionsUserAlerts.LaunchNavigation; constructor(public alert: Alert) { } }
export class ActionUserAlertsPhoneCall        { static readonly type = ActionsUserAlerts.PhoneCall;        constructor(public alert: Alert) { } }
export class ActionUserAlertsOpenWebsite      { static readonly type = ActionsUserAlerts.OpenWebsite;      constructor(public alert: Alert) { } }
