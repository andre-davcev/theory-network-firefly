import { MetadataUserProfile, UserProfile } from '@firefly/cloud';
import { DocumentSnapshot } from '@theory/firebase';

import { ActionsUserProfile } from './user-profile.actions.enum';

export class ActionUserProfileReset {
  static readonly type = ActionsUserProfile.Reset;
}
export class ActionUserProfileGet {
  static readonly type = ActionsUserProfile.Get;
  constructor(public id: string) {}
}
export class ActionUserProfileSet {
  static readonly type = ActionsUserProfile.Set;
  constructor(
    public snapshot: DocumentSnapshot<UserProfile>,
    public data?: UserProfile
  ) {}
}
export class ActionUserProfilePatch {
  static readonly type = ActionsUserProfile.Patch;
  constructor(
    public partial: Partial<UserProfile>,
    public save: boolean = false
  ) {}
}
export class ActionUserProfilePatchMetadata {
  static readonly type = ActionsUserProfile.PatchMetadata;
  constructor(public metadata: Partial<MetadataUserProfile>) {}
}
export class ActionUserProfileCreate {
  static readonly type = ActionsUserProfile.Create;
}
export class ActionUserProfileUpdate {
  static readonly type = ActionsUserProfile.Update;
}
export class ActionUserProfileSave {
  static readonly type = ActionsUserProfile.Save;
}
export class ActionUserProfileDelete {
  static readonly type = ActionsUserProfile.Delete;
}
export class ActionUserProfileWatch {
  static readonly type = ActionsUserProfile.Watch;
  constructor(public id: string) {}
}
export class ActionUserProfileSetId {
  static readonly type = ActionsUserProfile.SetId;
}
