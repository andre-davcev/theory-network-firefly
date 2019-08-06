import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserSubscription } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserSubscriptions extends ServiceBase<Record<string, UserSubscription>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-subscriptions', firestore, true);
    }
}
