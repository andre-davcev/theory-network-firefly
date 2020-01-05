import { User as FirebaseUser, firestore } from 'firebase/app'
import { Credentials } from '@theory/core';

import { User } from '@firefly/cloud';
import { ActionsUser } from './user.actions.enum';

export class ActionUserReset  { static readonly type = ActionsUser.Reset;   constructor() { } }
export class ActionUserGet    { static readonly type = ActionsUser.Get;     constructor(public id: string) { } }
export class ActionUserSet    { static readonly type = ActionsUser.Set;     constructor(public snapshot: firestore.DocumentSnapshot, public data?: User) { } }
export class ActionUserPatch  { static readonly type = ActionsUser.Patch;   constructor(public partial: Partial<User>, public save: boolean = false) { } }
export class ActionUserCreate { static readonly type = ActionsUser.Create;  constructor(public credentials: Credentials) { } }
export class ActionUserUpdate { static readonly type = ActionsUser.Create;  constructor() { } }
export class ActionUserSave   { static readonly type = ActionsUser.Save;    constructor() { } }
export class ActionUserDelete { static readonly type = ActionsUser.Delete;  constructor() { } }
export class ActionUserWatch  { static readonly type = ActionsUser.Watch;   constructor(public id: string) {} }

export class ActionUserAuthenticate       { static readonly type = ActionsUser.Authenticate;       constructor() { } }
export class ActionUserAuthenticateCheck  { static readonly type = ActionsUser.AuthenticateCheck;  constructor(public payload: FirebaseUser) {} }
export class ActionUserWatchLocation      { static readonly type = ActionsUser.WatchLocation;      constructor() { } }
export class ActionUserWatchCity          { static readonly type = ActionsUser.WatchCity;          constructor() { } }
export class ActionUserWatchLanguage     { static readonly type = ActionsUser.WatchLanguage;    constructor() { } }
export class ActionUserAddToken           { static readonly type = ActionsUser.AddToken;           constructor(public payload: string) { } }
export class ActionUserLoginEmail         { static readonly type = ActionsUser.LoginEmail;         constructor(public payload: Credentials) { } }
export class ActionUserLogout             { static readonly type = ActionsUser.Logout;             constructor() { } }

export class ActionUserWatchSubscriptionsStatus { static readonly type = ActionsUser.WatchSubscriptionsStatus; constructor() { } }
export class ActionUserSubscriptionToggle       { static readonly type = ActionsUser.SubscriptionToggle;       constructor(public id: string, public filter: boolean = true) { } }
