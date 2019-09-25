import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { EventCluster } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceEventClusters extends ServiceBase<Record<string, EventCluster>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('event-clusters', firestore, formBuilder, true);
    }
}

