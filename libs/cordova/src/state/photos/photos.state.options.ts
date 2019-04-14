import { StoreOptions } from '@ngxs/store/src/symbols';

import { StatePhotosModel } from './photos.state.model';

export const StatePhotosOptions: StoreOptions<StatePhotosModel> =
{
    name: 'cordovaPhotos',

    defaults:
    {
        authorizationOptions : undefined,
        authorized           : false,
        library              : [],
        albums               : [],
        watchingLibrary      : false,
        watchingAlbums       : false
    }
};
