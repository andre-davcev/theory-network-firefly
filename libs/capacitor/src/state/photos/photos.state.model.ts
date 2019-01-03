import { LibraryItem, AlbumItem, RequestAuthorizationOptions } from '@ionic-native/photo-library';

export interface StatePhotosModel
{
    authorizationOptions: RequestAuthorizationOptions;
    authorized:           boolean;
    library:              Array<LibraryItem>;
    albums:               Array<AlbumItem>;
    watchingLibrary:      boolean;
    watchingAlbums:       boolean;
}
