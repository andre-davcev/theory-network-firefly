import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from './base.service';
import { ClusterSubscriber } from '@firefly/core/models';


@Injectable({ providedIn: 'root' })
export class ServiceClusterSubscribers extends ServiceBase<Record<string, ClusterSubscriber>>
{
    constructor(firestore: AngularFirestore)
    {
        super('cluster-subscribers', firestore, true);
    }
}
