
import { ActionsImage } from './image.actions.enum';
import { Image } from '@firefly/core/models';
import { CoreEnum } from '@theory/core';
import { firestore } from 'firebase/app';
import { MockImagePath } from '@firefly/core/mocks';

export class ActionImageReset  { static readonly type = ActionsImage.Reset;   constructor() { } }
export class ActionImageGet    { static readonly type = ActionsImage.Get;     constructor(public id: string) { } }
export class ActionImageSet    { static readonly type = ActionsImage.Set;     constructor(public snapshot: firestore.DocumentSnapshot, public data?: Image) { } }
export class ActionImagePatch  { static readonly type = ActionsImage.Patch;   constructor(public partial: Partial<Image>) { } }
export class ActionImageCreate { static readonly type = ActionsImage.Create;  constructor() { } }
export class ActionImageUpdate { static readonly type = ActionsImage.Update;  constructor() { } }
export class ActionImageSave   { static readonly type = ActionsImage.Save;    constructor() { } }
export class ActionImageDelete { static readonly type = ActionsImage.Delete;  constructor() { } }
export class ActionImageSetId  { static readonly type = ActionsImage.SetId;   constructor(public id: string = CoreEnum.IdNew) { } }

export class ActionImageClear   { static readonly type = ActionsImage.Clear;   constructor() { } }
export class ActionImageUriSet  { static readonly type = ActionsImage.UriSet;  constructor(public dataUri: string) { } }
export class ActionImagePathSet { static readonly type = ActionsImage.PathSet; constructor(public bucketPath: string = MockImagePath) { } }
