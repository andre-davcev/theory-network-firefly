
import { ActionsImage } from './image.actions.enum';
import { Image } from '@firefly/core/models';
import { CoreEnum } from '@theory/core';

export class ActionImageReset  { static readonly type = ActionsImage.Reset;   constructor() { } }
export class ActionImageGet    { static readonly type = ActionsImage.Get;     constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionImageSet    { static readonly type = ActionsImage.Set;     constructor(public payload: Image) { } }
export class ActionImagePatch  { static readonly type = ActionsImage.Patch;   constructor(public payload: Partial<Image>) { } }
export class ActionImageCreate { static readonly type = ActionsImage.Create;  constructor() { } }
export class ActionImageSave   { static readonly type = ActionsImage.Save;    constructor() { } }
export class ActionImageDelete { static readonly type = ActionsImage.Delete;  constructor() { } }

export class ActionImageUriSet      { static readonly type = ActionsImage.UriSet;      constructor(public payload: string) { } }
export class ActionImageUriClear    { static readonly type = ActionsImage.UriClear;    constructor() {}}
export class ActionImageUploadClear { static readonly type = ActionsImage.UploadClear; constructor() { } }
export class ActionImageUpload      { static readonly type = ActionsImage.Upload;      constructor(public file: string, public fileName?: string) { } }
