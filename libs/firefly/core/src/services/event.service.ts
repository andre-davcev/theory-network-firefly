
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

        /*
            *) Move image code to image service
            *) Split up code so it can be used by event state
            1) Upload image to storage bucket
            2) Create image in 'images' collection
            3) Patch event with image id
            4) Create event in 'events' collection
            5) Grab event.clusters[0]
            6) Set cluster.events = {...clusters.events, Record<string, DocumentReference>}
            7) Patch cluster
            8) Patch user events/images

            *) In event watch, write downloadUrl to event state
            *) Create downloadUrl @Selector
            *) Update asset-event to use modal picker
            *) On cluster select, add to clusters array
            *) Photo resize cloud function
            *) On user create, also create dummy first cluster
            *) Create eventClusters as Record<string, Cluster>
            *) NGXS event create action
            *) Update and test all cloud functions
            *) Add loading screen while creating/updating
            *) Add toast for success/error
            *) Install copilot
        */

        return this.image.upload(imagePath, image.id).pipe
        (
            switchMap(() => this.image.set(image)),
            tap(() => event = { ...event, [EventKey.ImageId]: image.id}),
            switchMap(() => this.create(event))
        );
    }
}
