import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CameraResultType, CameraSource, CameraOptions, Plugins, CameraPhoto } from '@capacitor/core';
import { Injectable } from '@angular/core';

const { Camera } = Plugins;

@Injectable({ providedIn: 'root' })
export class ServiceCamera
{
    public getPhoto
    (
        options: CameraOptions =
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
            map((photo: CameraPhoto) =>
                photo.dataUrl
            )
        );
    }
}
