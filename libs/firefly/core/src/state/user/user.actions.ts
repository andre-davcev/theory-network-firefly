import { User as FirebaseUser } from 'firebase/app'
import { Credentials } from '@theory/core';

import { User } from '@firefly/core/models';
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

export class ActionUserWatchClusters
{
    static readonly type = ActionsUser.UserWatchClusters;

    constructor(public payload: Record<string, string>) { }
}
