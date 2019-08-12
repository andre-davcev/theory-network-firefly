import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserEvent } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserEvents extends ServiceBase<Record<string, UserEvent>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-events', firestore, true);
    }
}
