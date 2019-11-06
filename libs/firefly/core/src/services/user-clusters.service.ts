import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceAsset } from '@theory/firebase';
import { UserCluster } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ServiceUserClusters extends ServiceAsset<Record<string, UserCluster>>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('user-clusters', firestore, formBuilder, storage, true);
    }
}
