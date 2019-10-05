import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { Subscription } from '@firefly/core/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceSubscriptions extends ServiceBase<Subscription>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('clusters', firestore, formBuilder, true);
    }

    public formCreate(object: Subscription): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}

