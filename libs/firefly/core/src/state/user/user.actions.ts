import { User as FirebaseUser } from 'firebase/app'
import { Credentials } from '@theory/core';

import { User, Cluster, Stream, Alert } from '@firefly/core/models';
import { ActionsUser } from './user.actions.enum';

export class ActionUserAuthenticate
{
    static readonly type = ActionsUser.UserAuthenticate;

    constructor() {}
}

export class ActionUserAuthenticateCheck
{
    static readonly type = ActionsUser.UserAuthenticateCheck;

    constructor(public payload: FirebaseUser) {}
}

export class ActionUserWatch
{
    static readonly type = ActionsUser.UserWatch;

    constructor(public payload: string) {}
}

export class ActionUserWatchLanguage
{
    static readonly type = ActionsUser.UserWatchLanguage;
}

export class ActionUserCreate
{
    static readonly type = ActionsUser.UserCreate;

    constructor() {}
}

export class ActionUserAddToken
{
    static readonly type = ActionsUser.UserAddToken;

    constructor(public payload: string) {}
}

export class ActionLoginEmail
{
    static readonly type = ActionsUser.LoginEmail;

    constructor(public payload: Credentials) {}
}

export class ActionUserLogout
{
    static readonly type = ActionsUser.UserLogout;

    constructor() {}
}

export class ActionUserSet
{
    static readonly type = ActionsUser.UserSet;

    constructor(public payload: User) {}
}

export class ActionUserSetClusters
{
    static readonly type = ActionsUser.UserSetClusters;

    constructor(public payload: Record<string, Cluster>) {}
}

export class ActionUserSetSubscriptions
{
    static readonly type = ActionsUser.UserSetSubscriptions;

    constructor(public payload: Record<string, Cluster>) {}
}

export class ActionUserSetStream
{
    static readonly type = ActionsUser.UserSetStream;

    constructor(public payload: Array<Stream>) {}
}

export class ActionUserSetAlerts
{
    static readonly type = ActionsUser.UserSetAlerts;

    constructor(public payload: Array<Alert>) { }
}

export class ActionUserWatchClusters
{
    static readonly type = ActionsUser.UserWatchClusters;

    constructor(public payload: User) { }
}

export class ActionUserWatchLocation
{
    static readonly type = ActionsUser.UserWatchLocation;

    constructor(public payload: User) { }
}

export class ActionUserWatchStream
{
    static readonly type = ActionsUser.UserWatchStream;

    constructor(public payload: User) { }
}

export class ActionUserWatchSubscriptions
{
    static readonly type = ActionsUser.UserWatchSubscriptions;

    constructor(public payload: User) { }
}

export class ActionUserWatchAlerts
{
    static readonly type = ActionsUser.UserWatchAlerts;

    constructor(public payload: User) { }
}
