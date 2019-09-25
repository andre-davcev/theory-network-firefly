import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserEvent } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUserEvents extends ServiceBase<Record<string, UserEvent>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('user-events', firestore, formBuilder, true);
    }
}
