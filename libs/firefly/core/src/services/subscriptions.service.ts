import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceFirestore } from '@theory/firebase';
import { Subscription } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceSubscriptions extends ServiceFirestore<Subscription>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }
}

