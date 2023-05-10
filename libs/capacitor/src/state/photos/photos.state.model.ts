import { MediaResponse, MediaAlbumResponse } from '@capacitor-community/media';

export interface StatePhotosModel
{
    photos: MediaResponse;
    albums: MediaAlbumResponse;
}
