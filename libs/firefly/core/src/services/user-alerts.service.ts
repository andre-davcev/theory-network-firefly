import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserAlerts } from '../models/user-alerts.model';

@Injectable({ providedIn: 'root' })
export class ServiceUserAlerts extends ServiceBase<UserAlerts>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-alerts', firestore);
    }
}
