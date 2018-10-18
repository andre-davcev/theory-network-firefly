export enum ActionsSubscriptions
{
    SubscriptionsGet = '[Subscriptions] Get'
}

export class ActionSubscriptionsGet
{
    static readonly type = ActionsSubscriptions.SubscriptionsGet;

    constructor() {}
}
