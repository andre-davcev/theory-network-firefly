import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { User as FirebaseUser, UserInfo } from 'firebase/app';
import { ServiceBase } from './base.service';
import { User } from '../models';
import { AuthProvider } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceUser extends ServiceBase<User>
{
    constructor(firestore: AngularFirestore)
    {
        super('users', firestore);
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
}
