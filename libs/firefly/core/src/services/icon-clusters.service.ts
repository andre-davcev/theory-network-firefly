import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { IconCluster } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceIconClusters extends ServiceBase<Record<string, IconCluster>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('icon-clusters', firestore, formBuilder, true);
    }
}
