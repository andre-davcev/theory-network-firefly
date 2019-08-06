import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from './base.service';
import { UserImage } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUserImages extends ServiceBase<Record<string, UserImage>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-images', firestore, true);
    }
}
