import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceFirestore } from '@theory/firebase';
import { User } from '@firefly/cloud';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUsers extends ServiceFirestore<User>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public formCreate(object: User): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}
