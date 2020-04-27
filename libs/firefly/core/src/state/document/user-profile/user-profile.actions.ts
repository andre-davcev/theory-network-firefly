import { firestore } from 'firebase/app'

import { UserProfile, MetadataUserProfile } from '@firefly/cloud';
import { ActionsUserProfile } from './user-profile.actions.enum';

export class ActionUserProfileReset         { static readonly type = ActionsUserProfile.Reset;         constructor() { } }
export class ActionUserProfileGet           { static readonly type = ActionsUserProfile.Get;           constructor(public id: string) { } }
export class ActionUserProfileSet           { static readonly type = ActionsUserProfile.Set;           constructor(public snapshot: firestore.DocumentSnapshot, public data?: UserProfile) { } }
export class ActionUserProfilePatch         { static readonly type = ActionsUserProfile.Patch;         constructor(public partial: Partial<UserProfile>, public save: boolean = false) { } }
export class ActionUserProfilePatchMetadata { static readonly type = ActionsUserProfile.PatchMetadata; constructor(public partial: Partial<MetadataUserProfile>) { } }
export class ActionUserProfileCreate        { static readonly type = ActionsUserProfile.Create;        constructor() { } }
export class ActionUserProfileUpdate        { static readonly type = ActionsUserProfile.Update;        constructor() { } }
export class ActionUserProfileSave          { static readonly type = ActionsUserProfile.Save;          constructor() { } }
export class ActionUserProfileDelete        { static readonly type = ActionsUserProfile.Delete;        constructor() { } }
export class ActionUserProfileWatch         { static readonly type = ActionsUserProfile.Watch;         constructor(public id: string) {} }
export class ActionUserProfileSetId         { static readonly type = ActionsUserProfile.SetId;         constructor() { } }
