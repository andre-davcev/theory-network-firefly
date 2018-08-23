export enum ActionsAlerts
{
    AlertsGet = '[Alerts] Alerts Get',
}

export class AlertsGet
{
    static readonly type = ActionsAlerts.AlertsGet;

    constructor() {}
}
