import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { ClusterEvent } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceClusterEvents extends ServiceBase<Record<string, ClusterEvent>>
{
    constructor(firestore: AngularFirestore)
    {
        super('cluster-events', firestore, true);
    }
}
