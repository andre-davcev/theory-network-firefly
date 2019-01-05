import { PhotosFetchOptions, PhotosAlbumsFetchOptions } from '@capacitor/core';

import { ActionPhotos } from './photos.actions.enum';

export class ActionPhotosGet
{
    static readonly type = ActionPhotos.Get;

    constructor(public payload?: PhotosFetchOptions) { }
}

export class ActionPhotosGetAlbums
{
    static readonly type = ActionPhotos.GetAlbums;

    constructor(public payload?: PhotosAlbumsFetchOptions) { }
}
