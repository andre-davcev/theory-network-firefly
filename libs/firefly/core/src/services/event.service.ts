
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Event } from '@firefly/core/models';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceEvent extends ServiceBase<Event>
{
    constructor(firestore: AngularFirestore)
    {
        super('events', firestore);
    }
}
