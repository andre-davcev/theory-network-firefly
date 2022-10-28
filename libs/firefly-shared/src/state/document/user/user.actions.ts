import { User as FirebaseUser, DocumentSnapshot } from '@theory/firebase'
import { Credentials } from '@theory/core';

import { User, MetadataUser } from '@firefly/cloud';
import { ActionsUser } from './user.actions.enum';
import { FirebaseError } from '@angular/fire/app';

export class ActionUserReset         { static readonly type = ActionsUser.Reset;         constructor() { } }
export class ActionUserGet           { static readonly type = ActionsUser.Get;           constructor(public id: string) { } }
export class ActionUserSet           { static readonly type = ActionsUser.Set;           constructor(public snapshot: DocumentSnapshot, public data?: User) { } }
export class ActionUserPatch         { static readonly type = ActionsUser.Patch;         constructor(public partial: Partial<User>, public save: boolean = false) { } }
export class ActionUserPatchMetadata { static readonly type = ActionsUser.PatchMetadata; constructor(public metadata: Partial<MetadataUser>) { } }
export class ActionUserCreate        { static readonly type = ActionsUser.Create;        constructor(public credentials: Credentials) { } }
export class ActionUserUpdate        { static readonly type = ActionsUser.Update;        constructor() { } }
export class ActionUserSave          { static readonly type = ActionsUser.Save;          constructor() { } }
export class ActionUserDelete        { static readonly type = ActionsUser.Delete;        constructor() { } }
export class ActionUserWatch         { static readonly type = ActionsUser.Watch;         constructor(public id: string) {} }

export class ActionUserAuthenticate       { static readonly type = ActionsUser.Authenticate;       constructor() { } }
export class ActionUserAuthenticateCheck  { static readonly type = ActionsUser.AuthenticateCheck;  constructor(public payload: FirebaseUser) {} }
export class ActionUserAnonymousLogin     { static readonly type = ActionsUser.AnonymousLogin;     constructor() { } }
export class ActionUserWatchLanguage      { static readonly type = ActionsUser.WatchLanguage;      constructor() { } }
export class ActionUserWatchCity          { static readonly type = ActionsUser.WatchCity;          constructor() { } }
export class ActionUserAddToken           { static readonly type = ActionsUser.AddToken;           constructor(public payload: string) { } }
export class ActionUserLoginEmail         { static readonly type = ActionsUser.LoginEmail;         constructor(public payload: Credentials) { } }
export class ActionUserLogout             { static readonly type = ActionsUser.Logout;             constructor() { } }
export class ActionUserResetPassword      { static readonly type = ActionsUser.ResetPassword;      constructor(public payload: Credentials) { } }
export class ActionUserResetAll           { static readonly type = ActionsUser.ResetAll;           constructor() { } }
export class ActionUserSetErrorAuth       { static readonly type = ActionsUser.SetErrorAuth;       constructor(public errorAuth: FirebaseError = null) { } }

export class ActionUserNotificationsSet { static readonly type = ActionsUser.NotificationsSet; constructor() { } }
export class ActionUserIsPublisherSet   { static readonly type = ActionsUser.IsPublisherSet;   constructor(public isPublisher:  boolean) { } }
