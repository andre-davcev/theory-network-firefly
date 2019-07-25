import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IconClusters } from '@firefly/core/models';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceIconClusters extends ServiceBase<IconClusters>
{
    constructor(firestore: AngularFirestore)
    {
        super('icon-clusters', firestore, true);
    }
}
