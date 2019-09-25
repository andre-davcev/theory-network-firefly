import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { ImageEvent } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceImageEvents extends ServiceBase<Record<string, ImageEvent>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('image-events', firestore, formBuilder, true);
    }
}
