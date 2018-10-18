export enum ActionsAlerts
{
    ActionAlertsGet = '[Alerts] Alerts Get',
}

export class ActionAlertsGet
{
    static readonly type = ActionsAlerts.ActionAlertsGet;

    constructor() {}
}
