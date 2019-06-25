import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserSubscriptions } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserSubscriptions extends ServiceBase<UserSubscriptions>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-subscriptions', firestore);
    }
}
