import { Injectable } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { switchMap, map, last, tap } from 'rxjs/operators';
import { StorageFormat, ModelKey } from '@theory/firebase';
import { Filesystem } from '@theory/capacitor';
import { FileReadResult } from '@capacitor/core';
import { CoreEnum } from '@theory/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image, Event, AssetKey, EventKey } from '@firefly/core/models';

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

    public createWithUpload(event: Event, imagePath: string): Observable<Event>
    {
        const image:      Image  = this.fromEvent(event);
        const bucketPath: string = this.toBucketPath(image.id);

        event =
        {
            ...event,
            [EventKey.ImageId]: image.id
        };

        return this.upload(imagePath, bucketPath).pipe
        (
            switchMap(() => this.set(image)),
            map(() => event)
        );
    }

    private id(event: Event): string
    {
        return `${event.userId}-${this.name}-${new Date().getTime()}.jpg`;
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
        const image: Image =
        {
            [ModelKey.Id]          : this.id(event),
            [AssetKey.Name]        : '',
            [AssetKey.Description] : '',
            [AssetKey.Private]     : true,
            [AssetKey.UserId]      : event.userId,
            [AssetKey.Draft]       : false
        };

        return image;
    }
}
