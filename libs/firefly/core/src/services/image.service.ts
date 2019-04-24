import { Injectable } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { StorageFormat } from '@theory/firebase';
import { Filesystem } from '@theory/capacitor';
import { FileReadResult } from '@capacitor/core';
import { CoreEnum } from '@theory/core';

@Injectable({ providedIn: 'root' })
export class ServiceImage
{
    constructor
    (
        private storage: AngularFireStorage
    ) { }

    public base64(path: string): Observable<string>
    {
        return from(Filesystem.readFile({ path })).pipe
        (
            map((result: FileReadResult) => result.data),
            map((data: string) => `${CoreEnum.DataUri}${data}`)
        );
    }

    public upload(filePath: string, path: string): Observable<string>
    {
        const ref: AngularFireStorageReference = this.storage.ref(path);

        return this.base64(filePath).
        pipe
        (
            map((image: string) => ref.putString(image, StorageFormat.DataUrl)),
            switchMap((task: AngularFireUploadTask) => task.snapshotChanges()),
            last(),
            switchMap(() => ref.getDownloadURL())
        );
    }
}
