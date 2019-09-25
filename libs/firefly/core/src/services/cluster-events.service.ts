import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { ClusterEvent } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceClusterEvents extends ServiceBase<Record<string, ClusterEvent>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('cluster-events', firestore, formBuilder, true);
    }
}
