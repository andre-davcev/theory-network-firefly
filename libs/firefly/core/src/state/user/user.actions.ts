import { User as FirebaseUser } from 'firebase/app'
import { Credentials,CoreEnum } from '@theory/core';

import { User } from '@firefly/core/models';
import { ActionsUser } from './user.actions.enum';

export class ActionUserReset  { static readonly type = ActionsUser.Reset;   constructor() { } }
export class ActionUserGet    { static readonly type = ActionsUser.Get;     constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionUserSet    { static readonly type = ActionsUser.Set;     constructor(public payload: User) { } }
export class ActionUserPatch  { static readonly type = ActionsUser.Patch;   constructor(public payload: Partial<User>, public save: boolean = false) { } }
export class ActionUserCreate { static readonly type = ActionsUser.Create;  constructor() { } }
export class ActionUserSave   { static readonly type = ActionsUser.Save;    constructor() { } }
export class ActionUserDelete { static readonly type = ActionsUser.Delete;  constructor() { } }

export class ActionUserAuthenticate       { static readonly type = ActionsUser.Authenticate;       constructor() { } }
export class ActionUserAuthenticateCheck  { static readonly type = ActionsUser.AuthenticateCheck;  constructor(public payload: FirebaseUser) {} }
export class ActionUserWatch              { static readonly type = ActionsUser.Watch;              constructor(public payload: string) {} }
export class ActionUserWatchLanguage      { static readonly type = ActionsUser.WatchLanguage;      constructor() { } }
export class ActionUserAddToken           { static readonly type = ActionsUser.AddToken;           constructor(public payload: string) { } }
export class ActionUserLoginEmail         { static readonly type = ActionsUser.LoginEmail;         constructor(public payload: Credentials) { } }
export class ActionUserLogout             { static readonly type = ActionsUser.Logout;             constructor() { } }
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

    constructor(public payload: Credentials) {}
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

export class ActionUserSubscribe
{
    static readonly type = ActionsUser.UserSubscribe;

    constructor(public payload: string) { }
}

export class ActionUserUnsubscribe
{
    static readonly type = ActionsUser.UserUnsubscribe;

    constructor(public payload: string) { }
}
