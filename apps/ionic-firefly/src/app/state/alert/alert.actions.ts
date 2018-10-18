export enum ActionsAlerts
{
    AlertsGet = '[Alerts] Alerts Get',
}

export class ActionAlertsGet
{
    static readonly type = ActionsAlerts.AlertsGet;

    constructor() {}
}
