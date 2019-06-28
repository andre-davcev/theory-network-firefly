import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserClusters } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserClusters extends ServiceBase<UserClusters>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-clusters', firestore);
    }
}

