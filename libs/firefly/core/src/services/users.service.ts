import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { User as FirebaseUser, UserInfo } from 'firebase/app';
import { ServiceBase, AuthProvider } from '@theory/firebase';
import { User } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceUsers extends ServiceBase<User>
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
