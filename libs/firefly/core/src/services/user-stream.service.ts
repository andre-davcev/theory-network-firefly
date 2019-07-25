import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserStream } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserStream extends ServiceBase<UserStream>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-stream', firestore, true);
    }
}
