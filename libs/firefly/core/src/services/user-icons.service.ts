import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserIcons } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserIcons extends ServiceBase<UserIcons>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-icons', firestore, true);
    }
}
