import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Image, Event } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ServiceAsset } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceImages extends ServiceAsset<Image>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('images', firestore, formBuilder, storage);
    }

    public formCreate(object: Image): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }

    public createWithUpload(data: Image, imagePath: string): Observable<Image>
    {
        data.id = this.id(data);

        const bucketPath: string = this.toBucketPath(data.id);

        return this.upload(imagePath, bucketPath).pipe
        (
            switchMap(() => this.set(data)),
            map(() => data)
        );
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
/*
    public createWithUploadFromEvent(event: Event, imagePath: string): Observable<Event>
    {
        const image:      Image = this.fromEvent(event);
        const bucketPath: string = this.toBucketPath(image.id);

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
*/
}
