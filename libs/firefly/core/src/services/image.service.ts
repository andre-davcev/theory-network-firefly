import { Injectable } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { StorageFormat, ModelKey } from '@theory/firebase';
import { Filesystem } from '@theory/capacitor';
import { FileReadResult } from '@capacitor/core';
import { CoreEnum } from '@theory/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image, Event, AssetKey } from '@firefly/core/models';

import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceImage extends ServiceBase<Image>
{
    constructor
    (
        firestore: AngularFirestore,
        private storage: AngularFireStorage
    )
    {
        super('images', firestore);
    }

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

    private bucketPath(event: Event): string
    {
        return `${event.userId}/${this.name}/${new Date().getTime()}.jpg`;
    }

    private toId(bucketPath: string): string
    {
        return bucketPath.replace('/', '-');
    }

    private toBucketPath(id: string): string
    {
        return id.replace('-', '/');
    }

    public fromEvent(event: Event): Image
    {
        const id: string = this.bucketPath(event);

        const image: Image =
        {
            [ModelKey.Id]          : id,
            [AssetKey.Name]        : '',
            [AssetKey.Description] : '',
            [AssetKey.Private]     : true,
            [AssetKey.UserId]      : event.userId,
            [AssetKey.Draft]       : false
        };

        return image;
    }
}
