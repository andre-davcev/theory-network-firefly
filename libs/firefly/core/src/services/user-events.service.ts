import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserEvents } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserEvents extends ServiceBase<UserEvents>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-events', firestore, true);
    }
}
