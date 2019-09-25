import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserSubscription } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUserSubscriptions extends ServiceBase<Record<string, UserSubscription>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('user-subscriptions', firestore, formBuilder, true);
    }
}
