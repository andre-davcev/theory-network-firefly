import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserCluster } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserClusters extends ServiceBase<Record<string, UserCluster>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-clusters', firestore, true);
    }
}
