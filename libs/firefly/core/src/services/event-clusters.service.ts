import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceEventsClusters extends ServiceBase<Record<string, string>>
{
    constructor(firestore: AngularFirestore)
    {
        super('event-clusters', firestore, true);
    }
}

