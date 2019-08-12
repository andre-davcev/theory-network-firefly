import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Alert } from '@firefly/core/models';
import { ServiceBase } from '@theory/firebase';


@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceBase<Alert>
{
    constructor(firestore: AngularFirestore)
    {
        super('alerts', firestore);
    }
}

