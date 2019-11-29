import { Icon } from '@firefly/core/models';

import { ActionsIcon } from './icon.actions.enum';
import { CoreEnum } from '@theory/core';
import { firestore } from 'firebase';
import { MockIconPath } from '@firefly/core/mocks';

export class ActionIconReset  { static readonly type = ActionsIcon.Reset;   constructor() { } }
export class ActionIconGet    { static readonly type = ActionsIcon.Get;     constructor(public id: string) { } }
export class ActionIconSetId  { static readonly type = ActionsIcon.SetId;   constructor(public id: string = CoreEnum.IdNew) { } }
export class ActionIconSet    { static readonly type = ActionsIcon.Set;     constructor(public snapshot: firestore.DocumentSnapshot, public data?: Icon) { } }
export class ActionIconPatch  { static readonly type = ActionsIcon.Patch;   constructor(public partial: Partial<Icon>) { } }
export class ActionIconCreate { static readonly type = ActionsIcon.Create;  constructor() { } }
export class ActionIconUpdate { static readonly type = ActionsIcon.Create;  constructor() { } }
export class ActionIconSave   { static readonly type = ActionsIcon.Save;    constructor() { } }
export class ActionIconDelete { static readonly type = ActionsIcon.Delete;  constructor() { } }

export class ActionIconSetUrl      { static readonly type = ActionsIcon.SetUrl;      constructor(public url: string, public bucketPath: string = CoreEnum.IdNew) { } }
export class ActionIconSetPath     { static readonly type = ActionsIcon.SetPath;     constructor(public bucketPath: string = MockIconPath) { } }
export class ActionIconClear       { static readonly type = ActionsIcon.Clear;       constructor() { } }
export class ActionIconUploadClear { static readonly type = ActionsIcon.UploadClear; constructor() { } }
export class ActionIconUpload      { static readonly type = ActionsIcon.Upload;      constructor() { } }
