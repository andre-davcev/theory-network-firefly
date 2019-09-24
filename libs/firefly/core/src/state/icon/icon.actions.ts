import { Icon } from '@firefly/core/models';

import { ActionsIcon } from './icon.actions.enum';

export class ActionIconReset  { static readonly type = ActionsIcon.Reset;   constructor() { } }
export class ActionIconGet    { static readonly type = ActionsIcon.Get;     constructor() { } }
export class ActionIconSet    { static readonly type = ActionsIcon.Set;     constructor(public payload: Icon) { } }
export class ActionIconPatch  { static readonly type = ActionsIcon.Patch;   constructor(public payload: Partial<Icon>) { } }
export class ActionIconCreate { static readonly type = ActionsIcon.Create;  constructor() { } }
export class ActionIconSave   { static readonly type = ActionsIcon.Save;    constructor() { } }
export class ActionIconDelete { static readonly type = ActionsIcon.Delete;  constructor() { } }

export class ActionIconUploadClear { static readonly type = ActionsIcon.UploadClear; constructor() { } }
export class ActionIconUpload      { static readonly type = ActionsIcon.Upload;      constructor(public file: string, public fileName?: string) { } }
