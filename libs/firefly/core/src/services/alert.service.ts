import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Alert } from '@firefly/core/models';
import { ServiceBase } from './base.service';


@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceBase<Alert>
{
    constructor(firestore: AngularFirestore)
    {
        super('alerts', firestore);
    }
}

