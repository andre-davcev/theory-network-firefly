import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceUserSubscriptions extends ServiceBase<Record<string, boolean>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-subscriptions', firestore, true);
    }
}
