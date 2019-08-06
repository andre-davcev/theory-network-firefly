import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserStreamItem } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserStream extends ServiceBase<Record<string, UserStreamItem>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-stream', firestore, true);
    }
}
