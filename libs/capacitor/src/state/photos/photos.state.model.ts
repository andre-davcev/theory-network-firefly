import { PhotosResult, PhotosAlbumsResult } from '@capacitor/core';

export interface StatePhotosModel
{
    photos: PhotosResult;
    albums: PhotosAlbumsResult;
}
