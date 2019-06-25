import { ActionsUserStream } from './user-stream.actions.enum';

export class ActionUserStreamGet
{
    static readonly type = ActionsUserStream.Get

    constructor() { }
}

export class ActionUserStreamWatch
{
    static readonly type = ActionsUserStream.Watch;

    constructor() {}
}

export class ActionUserStreamPage
{
    static readonly type = ActionsUserStream.Page;

    constructor() {}
}

export class ActionUserStreamSubscribed
{
    static readonly type = ActionsUserStream.Subscribed;

    constructor(public payload: string) {}
}

export class ActionUserStreamUnsubscribed
{
    static readonly type = ActionsUserStream.Unsubscribed;

    constructor(public payload: string) {}
}
