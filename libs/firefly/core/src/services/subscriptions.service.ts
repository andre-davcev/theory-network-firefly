import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceAsset } from '@theory/firebase';
import { Subscription } from '@firefly/core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ServiceSubscriptions extends ServiceAsset<Subscription>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage,
    )
    {
        super('clusters', firestore, formBuilder, storage, true);
    }

    public formCreate(object: Subscription): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}

