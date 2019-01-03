import { GetLibraryOptions, RequestAuthorizationOptions } from '@ionic-native/photo-library';

import { ActionPhotos } from './photos.actions.enum';

export class ActionPhotosSetAuthorizationOptions
{
    static readonly type = ActionPhotos.SetAuthorizationOptions;

    constructor(public payload: RequestAuthorizationOptions) { }
}

export class ActionPhotosRequestAuthorization
{
    static readonly type = ActionPhotos.RequestAuthorization;

    constructor() { }
}

export class ActionPhotosGetLibrary
{
    static readonly type = ActionPhotos.GetLibrary;

    constructor(public payload: GetLibraryOptions) { }
}

export class ActionPhotosGetAlbums
{
    static readonly type = ActionPhotos.GetAlbums;

    constructor() { }
}
