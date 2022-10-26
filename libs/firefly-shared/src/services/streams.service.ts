import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceFirestore } from '@theory/firebase';
import { StreamInterest } from '@firefly/cloud';
import { UntypedFormBuilder } from '@angular/forms';

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

