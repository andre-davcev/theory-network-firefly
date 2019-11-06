import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceAsset } from '@theory/firebase';
import { ClusterSubscriber } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({ providedIn: 'root' })
export class ServiceClusterSubscribers extends ServiceAsset<Record<string, ClusterSubscriber>>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('cluster-subscribers', firestore, formBuilder, storage, true);
    }
}
