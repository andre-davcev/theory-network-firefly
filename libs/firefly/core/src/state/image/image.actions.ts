
import { ActionsImage } from './image.actions.enum';
import { Collection } from '@firefly/core';
import { Image } from '@firefly/core/models';
import { CoreEnum } from '@theory/core/enums';

export class ActionImageReset     { static readonly type = ActionsImage.Reset;     constructor() { }}
export class ActionImageGet       { static readonly type = ActionsImage.Get;       constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionImageCreate    { static readonly type = ActionsImage.Create;    constructor() { } }
export class ActionImageDelete    { static readonly type = ActionsImage.Delete;    constructor() { } }
export class ActionImagePatch     { static readonly type = ActionsImage.Patch;     constructor() { } }
export class ActionImagePatchForm { static readonly type = ActionsImage.PatchForm; constructor(public payload: Image) {} }

export class ActionImageUpload      { static readonly type = ActionsImage.Upload; constructor(public path: string, public file: string) { } }
export class ActionImageUploadClear { static readonly type = ActionsImage.UploadClear; }
export class ActionImageSave        { static readonly type = ActionsImage.Save; constructor(public collection: Collection.Images | Collection.Icons, public file: string, public fileName?: string) { } }
