import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceAsset } from '@theory/firebase';
import { ClusterEvent, Event } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceClusterEvents extends ServiceAsset<Record<string, ClusterEvent>>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage,
    )
    {
        super('cluster-events', firestore, formBuilder, storage, true);
    }

    public add(id: string, event: Event): Observable<any>
    {
        const clusterEvent: ClusterEvent =
        {
            sort:
            {
                name:        event.name,
                dateCreated: event.dateCreated
            }
        };

        return this.patch(id, { [event.id]: clusterEvent });
    }
}
