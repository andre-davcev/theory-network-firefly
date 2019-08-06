import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from './base.service';
import { ImageEvent } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceImageEvents extends ServiceBase<Record<string, ImageEvent>>
{
    constructor(firestore: AngularFirestore)
    {
        super('image-events', firestore, true);
    }
}
