import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Alert } from '@firefly/cloud';
import { ServiceFirestore } from '@theory/firebase';
import { FormBuilder, FormGroup } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceFirestore<Alert>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public formCreate(object: Alert): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}

