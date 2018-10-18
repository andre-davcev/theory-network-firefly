import { Credentials } from '../../interfaces/credentials.interface';

import { User } from '@firefly/core';

export enum ActionsUser
{
    UserAuthenticate      = '[User] User Authenticate',
    UserAuthenticateCheck = '[User] User Authenticate Check',
    UserGet               = '[User] User Get',
    UserCreate            = '[User] User Create',
    UserAddToken          = '[User] User Add Token',
    LoginEmail            = '[User] Login Email',
    UserLogout            = '[User] User Logout',
    UserSet               = '[User] User Set'
}

export class UserAuthenticate
{
    static readonly type = ActionsUser.UserAuthenticate;

    constructor() {}
}

export class UserAuthenticateCheck
{
    static readonly type = ActionsUser.UserAuthenticateCheck;

    constructor(public payload: firebase.User) {}
}

export class UserGet
{
    static readonly type = ActionsUser.UserGet;

    constructor(public payload: firebase.User) {}
}

export class UserCreate
{
    static readonly type = ActionsUser.UserCreate;

    constructor() {}
}

export class UserAddToken
{
    static readonly type = ActionsUser.UserAddToken;

    constructor(public payload: string) {}
}

export class LoginEmail
{
    static readonly type = ActionsUser.LoginEmail;

    constructor(public payload: Credentials) {}
}

export class UserLogout
{
    static readonly type = ActionsUser.UserLogout;

    constructor() {}
}

export class UserSet
{
    static readonly type = ActionsUser.UserSet;

    constructor(public payload: User) {}
}
