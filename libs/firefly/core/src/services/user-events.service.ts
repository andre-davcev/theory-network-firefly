import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserEvent } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserEvents extends ServiceBase<Record<string, UserEvent>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-events', firestore, true);
    }
}
