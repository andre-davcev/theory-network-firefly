import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceAsset } from '@theory/firebase';
import { UserIcon } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ServiceUserIcons extends ServiceAsset<Record<string, UserIcon>>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('user-icons', firestore, formBuilder, storage, true);
    }
}
