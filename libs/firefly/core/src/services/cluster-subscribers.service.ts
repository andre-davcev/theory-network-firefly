import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { ClusterSubscriber } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class ServiceClusterSubscribers extends ServiceBase<Record<string, ClusterSubscriber>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('cluster-subscribers', firestore, formBuilder, true);
    }
}
