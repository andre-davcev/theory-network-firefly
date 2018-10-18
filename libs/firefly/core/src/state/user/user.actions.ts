import { Credentials } from '@theory/core';

import { User, ActionsUser } from '@firefly/core';

export class ActionUserAuthenticate
{
    static readonly type = ActionsUser.UserAuthenticate;

    constructor() {}
}

export class ActionUserAuthenticateCheck
{
    static readonly type = ActionsUser.UserAuthenticateCheck;

    constructor(public payload: firebase.User) {}
}

export class ActionUserGet
{
    static readonly type = ActionsUser.UserGet;

    constructor(public payload: firebase.User) {}
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
