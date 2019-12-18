import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceFirestore } from '@theory/firebase';
import { StreamItem } from '@firefly/cloud';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceStreams extends ServiceFirestore<StreamItem>
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

