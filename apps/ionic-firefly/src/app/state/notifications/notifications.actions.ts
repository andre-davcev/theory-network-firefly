export enum ActionsNotifications
{
    NotificationsWatch  = '[Notifications] Watch',
    NotificationsGet    = '[Notifications] Get'
}

export class ActionNotificationsWatch
{
    static readonly type = ActionsNotifications.NotificationsWatch;

    constructor() {}
}

export class ActionNotificationsGet
{
    static readonly type = ActionsNotifications.NotificationsGet;

    constructor() {}
}
