import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Alert } from '@firefly/core/models';
import { ServiceAsset } from '@theory/firebase';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceAsset<Alert>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('alerts', firestore, formBuilder, storage);
    }

    public formCreate(object: Alert): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}

