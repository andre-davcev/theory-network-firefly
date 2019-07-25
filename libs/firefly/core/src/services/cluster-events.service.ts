import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ClusterEvents } from '@firefly/core/models';
import { ServiceBase } from './base.service';


@Injectable({ providedIn: 'root' })
export class ServiceClusterEvents extends ServiceBase<ClusterEvents>
{
    constructor(firestore: AngularFirestore)
    {
        super('cluster-events', firestore, true);
    }
}
