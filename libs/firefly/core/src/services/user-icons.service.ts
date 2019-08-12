import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserIcon } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserIcons extends ServiceBase<Record<string, UserIcon>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-icons', firestore, true);
    }
}
