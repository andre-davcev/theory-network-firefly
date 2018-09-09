export enum ActionsNotifications
{
    NotificationsWatch  = '[Notifications] Watch',
    NotificationsGet    = '[Notifications] Get'
}

export class NotificationsWatch
{
    static readonly type = ActionsNotifications.NotificationsWatch;

    constructor() {}
}

export class NotificationsGet
{
    static readonly type = ActionsNotifications.NotificationsGet;

    constructor() {}
}
