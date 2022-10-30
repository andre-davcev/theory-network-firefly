import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ServiceFirestore } from '@theory/firebase';
import { Alert } from '@firefly/cloud';


@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceFirestore<Alert>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: UntypedFormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public formCreate(object: Alert): UntypedFormGroup
    {
        return super.formCreate(
        {
            ...object,

            interests : [object.interests, []]
        });
    }
}

