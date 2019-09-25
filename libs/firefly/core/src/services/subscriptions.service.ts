import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { Subscription } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceSubscriptions extends ServiceBase<Subscription>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('clusters', firestore, formBuilder, true);
    }
}

