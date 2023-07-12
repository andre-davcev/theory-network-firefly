import { MediaAlbumResponse, MediaResponse } from '@capacitor-community/media';

export interface StatePhotosModel {
  photos: MediaResponse | null;
  albums: MediaAlbumResponse | null;
}
