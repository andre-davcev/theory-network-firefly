import { Icon } from '@firefly/core/models';

import { ActionsIcon } from './icon.actions.enum';
import { CoreEnum } from '@theory/core';

export class ActionIconReset  { static readonly type = ActionsIcon.Reset;   constructor() { } }
export class ActionIconGet    { static readonly type = ActionsIcon.Get;     constructor(public payload: string) { } }
export class ActionIconSetId  { static readonly type = ActionsIcon.SetId;   constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionIconSet    { static readonly type = ActionsIcon.Set;     constructor(public payload: Icon) { } }
export class ActionIconPatch  { static readonly type = ActionsIcon.Patch;   constructor(public payload: Partial<Icon>) { } }
export class ActionIconCreate { static readonly type = ActionsIcon.Create;  constructor() { } }
export class ActionIconUpdate { static readonly type = ActionsIcon.Create;  constructor() { } }
export class ActionIconSave   { static readonly type = ActionsIcon.Save;    constructor() { } }
export class ActionIconDelete { static readonly type = ActionsIcon.Delete;  constructor() { } }

export class ActionIconUriSet      { static readonly type = ActionsIcon.UriSet;      constructor(public payload: string) { } }
export class ActionIconUriClear    { static readonly type = ActionsIcon.UriClear;    constructor() { }}
export class ActionIconUploadClear { static readonly type = ActionsIcon.UploadClear; constructor() { } }
export class ActionIconUpload      { static readonly type = ActionsIcon.Upload;      constructor() { } }
