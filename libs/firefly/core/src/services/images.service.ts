import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { ServiceMedia } from './media.service';
import { Image, Event } from '../models';
import { ServiceUsers } from './users.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Observable } from 'rxjs';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { CoreEnum } from '@theory/core/enums';

@Injectable({ providedIn: 'root' })
export class ServiceImages extends ServiceMedia<Image>
{
    constructor
    (
        firestore: AngularFirestore,
        storage:   AngularFireStorage,
        user:      ServiceUsers,
        webview:   WebView
    )
    {
        super('images', firestore, storage, user, webview);
    }

    public build(userId: string, defaults: Image): Image
    {
        const image: Image =
        {
            ...this.clone(defaults),
            id: CoreEnum.IdNew,
            userId
        };

        return image;
    }

    public fromEvent(event: Event): Image
    {
        const image: Image =
        {
            id          : this.id(event),
            name        : '',
            description : '',
            private     : true,
            userId      : event.userId,
            draft       : false
        };

        return image;
    }

    public createWithUploadFromEvent(event: Event, imagePath: string): Observable<Event>
    {
        const image:      Image = this.fromEvent(event);
        const bucketPath: string       = this.toBucketPath(image.id);

        event =
        {
            ...event,
            imageId: image.id
        };

        return this.upload(imagePath, bucketPath).pipe
        (
            switchMap(() => this.set(image)),
            mergeMap(() =>
              this.user.foreignKeyUpdate(image.userId, this.name, image.id)
            ),
            map(() => event)
        );
    }
}
