export enum ActionsSubscriptions
{
    SubscriptionsGet = '[Subscriptions] Get'
}

export class SubscriptionsGet
{
    static readonly type = ActionsSubscriptions.SubscriptionsGet;

    constructor() {}
}
