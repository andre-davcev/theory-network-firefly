import { User as FirebaseUser } from 'firebase/app'
import { Credentials, CoreEnum } from '@theory/core';

import { User } from '@firefly/core/models';
import { ActionsUser } from './user.actions.enum';

export class ActionUserReset  { static readonly type = ActionsUser.Reset;   constructor() { } }
export class ActionUserGet    { static readonly type = ActionsUser.Get;     constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionUserSet    { static readonly type = ActionsUser.Set;     constructor(public payload: User) { } }
export class ActionUserPatch  { static readonly type = ActionsUser.Patch;   constructor(public payload: Partial<User>) { } }
export class ActionUserCreate { static readonly type = ActionsUser.Create;  constructor() { } }
export class ActionUserSave   { static readonly type = ActionsUser.Save;    constructor() { } }
export class ActionUserDelete { static readonly type = ActionsUser.Delete;  constructor() { } }

export class ActionUserAuthenticate       { static readonly type = ActionsUser.UserAuthenticate;       constructor() { } }
export class ActionUserAuthenticateCheck  { static readonly type = ActionsUser.UserAuthenticateCheck;  constructor(public payload: FirebaseUser) {} }
export class ActionUserWatch              { static readonly type = ActionsUser.UserWatch;              constructor(public payload: string) {} }
export class ActionUserWatchLanguage      { static readonly type = ActionsUser.UserWatchLanguage;      constructor() { } }
export class ActionUserCreateOld          { static readonly type = ActionsUser.UserCreate;             constructor() { } }
export class ActionUserAddToken           { static readonly type = ActionsUser.UserAddToken;           constructor(public payload: string) { } }
export class ActionUserLoginEmail         { static readonly type = ActionsUser.LoginEmail;             constructor(public payload: Credentials) { } }
export class ActionUserLogout             { static readonly type = ActionsUser.UserLogout;             constructor() { } }
export class ActionUserSetOld             { static readonly type = ActionsUser.UserSet;                constructor(public payload: User) { } }
