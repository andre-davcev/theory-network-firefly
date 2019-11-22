import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageSize } from '../enums';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceStorage
{
    constructor(private storage: AngularFireStorage) { }

    public mediaType(data: string): string
    {
        const start: number = data.indexOf('/') + 1;
        const end:   number = data.indexOf(';');

        return data.substring(start, end);
    }

    public bucketPath(path: string, size: ImageSize = ImageSize.Medium): string
    {
        if (size == null || size === ImageSize.None || size === ImageSize.Original)
        {
            return path;
        }

        const segments:   Array<string> = path.split('/');
        const fileName:   string        = segments.pop();
        const fileParts:  Array<string> = fileName.split('.');

        segments.push(`${fileParts[0]}@${size}.${fileParts[1]}`);

        return segments.join('/');
    }

    public downloadUrl(path: string, size?: ImageSize): Observable<string | null>
    {
        return path == null ? of(null) : of(path).
        pipe
        (
            map((path: string) =>
                this.bucketPath(path, size)
            ),
            map((bucketPath: string) => this.storage.ref(bucketPath)),
            switchMap((ref: AngularFireStorageReference) => ref.getDownloadURL())
        );
    }
}
