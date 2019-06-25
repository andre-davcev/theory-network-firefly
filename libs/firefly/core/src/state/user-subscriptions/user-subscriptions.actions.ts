import { ActionsUserSubscriptions } from './user-subscriptions.actions.enum';

export class ActionUserSubscriptionsWatch
{
    static readonly type = ActionsUserSubscriptions.Watch;

    constructor() { }
}

export class ActionUserSubscriptionsWatchOn
{
    static readonly type = ActionsUserSubscriptions.WatchOn;

    constructor(public payload: Record<string, string>) { }
}

export class ActionUserSubscriptionsWatchOff
{
    static readonly type = ActionsUserSubscriptions.WatchOff;

    constructor(public payload: Record<string, string>) { }
}

export class ActionUserSubscriptionsOn
{
    static readonly type = ActionsUserSubscriptions.On;

    constructor(public payload: string) {}
}

export class ActionUserSubscriptionsOff
{
    static readonly type = ActionsUserSubscriptions.Off;

    constructor(public payload: string) {}
}

export class ActionUserSubscriptionsDelete
{
    static readonly type = ActionsUserSubscriptions.Delete;

    constructor(public payload: string) {}
}
