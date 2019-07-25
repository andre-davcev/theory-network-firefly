import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { EventClusters } from '@firefly/core/models';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceEventsClusters extends ServiceBase<EventClusters>
{
    constructor(firestore: AngularFirestore)
    {
        super('event-clusters', firestore, true);
    }
}

