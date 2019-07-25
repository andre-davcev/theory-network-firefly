import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ClusterSubscribers } from '@firefly/core/models';
import { ServiceBase } from './base.service';


@Injectable({ providedIn: 'root' })
export class ServiceClusterSubscribers extends ServiceBase<ClusterSubscribers>
{
    constructor(firestore: AngularFirestore)
    {
        super('cluster-subscribers', firestore, true);
    }
}
