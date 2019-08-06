import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from './base.service';
import { EventCluster } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceEventsClusters extends ServiceBase<Record<string, EventCluster>>
{
    constructor(firestore: AngularFirestore)
    {
        super('event-clusters', firestore, true);
    }
}

