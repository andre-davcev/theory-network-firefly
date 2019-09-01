import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { Subscription } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceSubscriptions extends ServiceBase<Subscription>
{
    constructor(firestore: AngularFirestore)
    {
        super('subscriptions', firestore, true);
    }
}

