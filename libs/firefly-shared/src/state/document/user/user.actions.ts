import { MetadataUser, User } from '@firefly/cloud';
import { Credentials } from '@theory/core';
import { DocumentSnapshot, User as FirebaseUser } from '@theory/firebase';

import { FirebaseError } from '@angular/fire/app';
import { ActionsUser } from './user.actions.enum';

export class ActionUserReset {
  static readonly type = ActionsUser.Reset;
}
export class ActionUserGet {
  static readonly type = ActionsUser.Get;
  constructor(public id: string) {}
}
export class ActionUserSet {
  static readonly type = ActionsUser.Set;
  constructor(public snapshot: DocumentSnapshot<User>, public data?: User) {}
}
export class ActionUserPatch {
  static readonly type = ActionsUser.Patch;
  constructor(public partial: Partial<User>, public save: boolean = false) {}
}
export class ActionUserPatchMetadata {
  static readonly type = ActionsUser.PatchMetadata;
  constructor(public metadata: Partial<MetadataUser>) {}
}
export class ActionUserCreate {
  static readonly type = ActionsUser.Create;
  constructor(public credentials: Credentials) {}
}
export class ActionUserUpdate {
  static readonly type = ActionsUser.Update;
}
export class ActionUserSave {
  static readonly type = ActionsUser.Save;
}
export class ActionUserDelete {
  static readonly type = ActionsUser.Delete;
}
export class ActionUserWatch {
  static readonly type = ActionsUser.Watch;
  constructor(public id: string) {}
}

export class ActionUserAuthenticate {
  static readonly type = ActionsUser.Authenticate;
}
export class ActionUserAuthenticateCheck {
  static readonly type = ActionsUser.AuthenticateCheck;
  constructor(public payload: FirebaseUser | null) {}
}
export class ActionUserAnonymousLogin {
  static readonly type = ActionsUser.AnonymousLogin;
}
export class ActionUserWatchLanguage {
  static readonly type = ActionsUser.WatchLanguage;
}
export class ActionUserWatchCity {
  static readonly type = ActionsUser.WatchCity;
}
export class ActionUserAddTokenAfterLogin {
  static readonly type = ActionsUser.AddTokenAfterLogin;
  constructor(public token: string) {}
}
export class ActionUserAddToken {
  static readonly type = ActionsUser.AddToken;
  constructor(public payload: string) {}
}
export class ActionUserLoginEmail {
  static readonly type = ActionsUser.LoginEmail;
  constructor(public payload: Credentials) {}
}
export class ActionUserLogout {
  static readonly type = ActionsUser.Logout;
}
export class ActionUserResetPassword {
  static readonly type = ActionsUser.ResetPassword;
  constructor(public payload: Credentials) {}
}
export class ActionUserResetAll {
  static readonly type = ActionsUser.ResetAll;
}
export class ActionUserSetErrorAuth {
  static readonly type = ActionsUser.SetErrorAuth;
  constructor(public errorAuth: FirebaseError | null = null) {}
}

export class ActionUserNotificationsSet {
  static readonly type = ActionsUser.NotificationsSet;
}
export class ActionUserIsPublisherSet {
  static readonly type = ActionsUser.IsPublisherSet;
  constructor(public isPublisher: boolean) {}
}
