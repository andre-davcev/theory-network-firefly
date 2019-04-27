
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Event, Image, EventKey } from '@firefly/core/models';
import { ServiceImage } from './image.service';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceEvent extends ServiceBase<Event>
{
    constructor
    (
        firestore: AngularFirestore,
        private image: ServiceImage
    )
    {
        super('events', firestore);
    }

    public createWithImage(event: Event, imagePath: string): Observable<void>
    {
        const image: Image = this.image.fromEvent(event);

        return this.image.upload(imagePath, image.id).pipe
        (
            switchMap(() => this.image.set(image)),
            tap(() => event = { ...event, [EventKey.ImageId]: image.id}),
            switchMap(() => this.create(event))
        );
    }
}
