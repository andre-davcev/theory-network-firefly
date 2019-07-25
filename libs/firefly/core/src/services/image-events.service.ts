import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ImageEvents } from '@firefly/core/models';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceImageEvents extends ServiceBase<ImageEvents>
{
    constructor(firestore: AngularFirestore)
    {
        super('image-events', firestore, true);
    }
}
