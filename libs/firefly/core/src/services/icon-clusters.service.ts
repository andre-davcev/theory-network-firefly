import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { IconCluster } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceIconClusters extends ServiceBase<Record<string, IconCluster>>
{
    constructor(firestore: AngularFirestore)
    {
        super('icon-clusters', firestore, true);
    }
}
