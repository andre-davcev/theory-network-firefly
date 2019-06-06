import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { ServiceMedia } from './media.service';
import { Image, Event, AssetKey, EventKey } from '../models';
import { ServiceUser } from './user.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ModelKey } from '@theory/firebase/enums';
import { Observable } from 'rxjs';
import { switchMap, mergeMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceImage extends ServiceMedia<Image>
{
    constructor
    (
        firestore: AngularFirestore,
        storage:   AngularFireStorage,
        user:      ServiceUser,
        webview:   WebView
    )
    {
        super('images', firestore, storage, user, webview);
    }

    public fromEvent(event: Event): Image
    {
        const image: Image =
        {
            [ModelKey.Id]          : this.id(event),
            [AssetKey.Name]        : '',
            [AssetKey.Description] : '',
            [AssetKey.Private]     : true,
            [AssetKey.UserId]      : event[AssetKey.UserId],
            [AssetKey.Draft]       : false
        };

        return image;
    }

    public createWithUpload(event: Event, imagePath: string): Observable<Event>
    {
        const image:      Image = this.fromEvent(event);
        const bucketPath: string       = this.toBucketPath(image[ModelKey.Id]);

        event =
        {
            ...event,
            [EventKey.ImageId]: image[ModelKey.Id]
        };

        return this.upload(imagePath, bucketPath).pipe
        (
            switchMap(() => this.set(image)),
            mergeMap(() =>
              this.user.foreignKeyUpdate(image[AssetKey.UserId], this.name, image[ModelKey.Id])
            ),
            map(() => event)
        );
    }
}
