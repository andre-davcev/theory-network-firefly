import { MediaFetchOptions } from '@capacitor-community/media';

import { ActionPhotos } from './photos.actions.enum';

export class ActionPhotosGet
{
    static readonly type = ActionPhotos.Get;

    constructor(public payload?: MediaFetchOptions) { }
}

export class ActionPhotosGetAlbums
{
    static readonly type = ActionPhotos.GetAlbums;
}
