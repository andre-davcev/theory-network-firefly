
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
            *) Create first cluster
            *) On user create, also create dummy first cluster
            *) Update asset-event to use modal picker
            *) On cluster select, add to clusters array
            *) Replace cluster/event/image/icon collections to use Array<string> from Record<string, DocumentReference>

            1) Upload image to storage bucket
            2) Create image in 'images' collection
            3) Patch event with image id
            4) Create event in 'events' collection
            5) Grab event.clusters[0]
            6) Set cluster.events = {...clusters.events, Record<string, DocumentReference>}
            7) Patch cluster

            *) Photo resize cloud function
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
