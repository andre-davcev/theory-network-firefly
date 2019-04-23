
import { ActionsImage } from './image.actions.enum';
import { Collection } from '@firefly/core';

export class ActionImageUpload
{
    static readonly type = ActionsImage.Upload;

    constructor(public path: string, public file: string) { }
}

export class ActionImageUploadClear
{
    static readonly type = ActionsImage.UploadClear;
}

export class ActionImageSave
{
    static readonly type = ActionsImage.Save;

    constructor(public collection: Collection.Images | Collection.Icons, public file: string, public fileName?: string) { }
}
