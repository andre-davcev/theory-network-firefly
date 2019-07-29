import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceUserIcons extends ServiceBase<Record<string, string>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-icons', firestore, true);
    }
}
