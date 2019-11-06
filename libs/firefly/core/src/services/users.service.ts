import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { User as FirebaseUser, UserInfo } from 'firebase/app';
import { AuthProvider, ServiceAsset } from '@theory/firebase';
import { User } from '@firefly/core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ServiceUsers extends ServiceAsset<User>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('users', firestore, formBuilder, storage);
    }

    public parseId(authData: FirebaseUser): string
    {
        const providerData : UserInfo = { ...authData.providerData[0] };

        const uid         : string = authData.uid;
        const providerId  : string = providerData.providerId;
        const email       : string = providerData.email;
        const id          : string = providerId === AuthProvider.Email ? `${providerId}:${email}` : `${providerId}:${uid}`;

        return id;
    }

    public formCreate(object: User): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}
