import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServiceCamera
{
    public getPhoto
    (
        options: ImageOptions =
        {
            quality    : 100,
            resultType : CameraResultType.DataUrl,
            source     : CameraSource.Photos
        }
    ): Observable<string>
    {
        return from(Camera.getPhoto(options)).
        pipe
        (
            map((photo: Photo) =>
                photo.dataUrl
            )
        );
    }
}
