import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ServiceFirestore } from '@theory/firebase';
import { StreamInterest } from '@firefly/cloud';

@Injectable({ providedIn: 'root' })
export class ServiceStreams extends ServiceFirestore<StreamInterest>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: UntypedFormBuilder
    )
    {
        super(firestore, formBuilder);
    }
}

