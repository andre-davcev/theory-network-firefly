import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';

import { StorageFormat, ImageSize } from '../enums';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ServiceStorage
{
    constructor
    (
        private storage: AngularFireStorage,
    ) { }

    public upload(data: string, bucketPath: string): Observable<string>
    {
        const ref: AngularFireStorageReference = this.storage.ref(bucketPath);

        return of(ref.putString(data, StorageFormat.DataUrl)).
        pipe
        (
            switchMap((task: AngularFireUploadTask) => task.snapshotChanges()),
            last(),
            switchMap(() => ref.getDownloadURL())
        );
    }

    public static mediaType(data: string): string
    {
        const start: number = data.indexOf('/') + 1;
        const end:   number = data.indexOf(';');

        return data.substring(start, end);
    }

    public toBucketPathSize(path: string, size: ImageSize = ImageSize.Medium): string
    {
        const segments:   Array<string> = path.split('/');
        const fileName:   string        = segments.pop();
        const fileParts:  Array<string> = fileName.split('.');

        segments.push(`${fileParts[0]}@${size}.${fileParts[1]}`);

        return segments.join('/');
    }

    public getDownloadUrl(path: string, size?: ImageSize): Observable<string | null>
    {
        return path == null ? of(null) : of(path).
        pipe
        (
            map((path: string) =>
                size == null ? path : this.toBucketPathSize(path, size)
            ),
            map((bucketPath: string) => this.storage.ref(bucketPath)),
            switchMap((ref: AngularFireStorageReference) => ref.getDownloadURL())
        );
    }

    public static isDataUrl(url: string): boolean
    {
        return !!url.match(/^data:image/);
    }

    public static isWebUrl(url: string): boolean
    {
        return !!url.match(/^http:/) || !!url.match(/^https:/);
    }
}
