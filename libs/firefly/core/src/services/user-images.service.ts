import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserImages } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserImages extends ServiceBase<UserImages>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-images', firestore, true);
    }
}
